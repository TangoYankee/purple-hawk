import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { MultiPolygon } from 'drizzle-pgis/types';
import { DB, DbType } from 'src/global/providers/db.provider';
import { borough } from 'src/schema/borough';
import { landUse } from 'src/schema/land-use';
import { InsertProject, project } from 'src/schema/project';
import { Extent, projectToTaxLot } from 'src/schema/project-tax-lot';
import { taxLot } from 'src/schema/tax-lot';

@Injectable()
export class ProjectService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAll() {
    const projectIdDistinctQuery = sql<string>`DISTINCT(${projectToTaxLot.projectId})`;
    const bblAggQuery = sql<
      Array<string>
    >`ARRAY_AGG(${projectToTaxLot.taxLotBbl}) OVER (PARTITION BY ${projectToTaxLot.projectId})`;

    const site = this.db.$with('site').as(
      this.db
        .select({
          siteProjectId: projectIdDistinctQuery.as('site_project_id'),
          siteBbls: bblAggQuery.as('site_bbls'),
        })
        .from(projectToTaxLot)
        .where(eq(projectToTaxLot.studyExtent, 'site'))
        .groupBy(projectToTaxLot.projectId, projectToTaxLot.taxLotBbl),
    );

    const siteQuery = this.db.with(site).select().from(site).as('siteQuery');

    const area = this.db.$with('area').as(
      this.db
        .select({
          areaProjectId: projectIdDistinctQuery.as('area_project_id'),
          areaBbls: bblAggQuery.as('area_bbls'),
        })
        .from(projectToTaxLot)
        .where(eq(projectToTaxLot.studyExtent, 'area'))
        .groupBy(projectToTaxLot.projectId, projectToTaxLot.taxLotBbl),
    );

    const areaQuery = this.db.with(area).select().from(area).as('areaQuery');

    return await this.db
      .select({
        id: project.id,
        name: project.name,
        userId: project.userId,
        siteBbls: siteQuery.siteBbls,
        areaBbls: areaQuery.areaBbls,
      })
      .from(areaQuery)
      .fullJoin(siteQuery, eq(areaQuery.areaProjectId, siteQuery.siteProjectId))
      .rightJoin(project, eq(siteQuery.siteProjectId, project.id));
  }

  async getById(id: string) {
    const projectIdDistinctQuery = sql<string>`DISTINCT(${projectToTaxLot.projectId})`;
    const bblAggQuery = sql<
      Array<string>
    >`ARRAY_AGG(${projectToTaxLot.taxLotBbl}) OVER (PARTITION BY ${projectToTaxLot.projectId})`;

    const site = this.db.$with('site').as(
      this.db
        .select({
          siteProjectId: projectIdDistinctQuery.as('site_project_id'),
          siteBbls: bblAggQuery.as('site_bbls'),
        })
        .from(projectToTaxLot)
        .where(eq(projectToTaxLot.studyExtent, 'site'))
        .groupBy(projectToTaxLot.projectId, projectToTaxLot.taxLotBbl),
    );

    const siteQuery = this.db.with(site).select().from(site).as('siteQuery');

    const area = this.db.$with('area').as(
      this.db
        .select({
          areaProjectId: projectIdDistinctQuery.as('area_project_id'),
          areaBbls: bblAggQuery.as('area_bbls'),
        })
        .from(projectToTaxLot)
        .where(eq(projectToTaxLot.studyExtent, 'area'))
        .groupBy(projectToTaxLot.projectId, projectToTaxLot.taxLotBbl),
    );

    const areaQuery = this.db.with(area).select().from(area).as('areaQuery');

    const results = await this.db
      .select({
        id: project.id,
        name: project.name,
        userId: project.userId,
        siteBbls: siteQuery.siteBbls,
        areaBbls: areaQuery.areaBbls,
      })
      .from(areaQuery)
      .fullJoin(siteQuery, eq(areaQuery.areaProjectId, siteQuery.siteProjectId))
      .rightJoin(project, eq(siteQuery.siteProjectId, project.id))
      .where(eq(project.id, id));
    return results[0];
  }

  async getByIdDescription({
    projectId,
    studyExtent,
    bufferFt,
  }: {
    projectId: string;
    studyExtent: Extent;
    bufferFt?: number | null;
  }) {
    const filter = sql`${projectToTaxLot.projectId} = ${projectId} and ${projectToTaxLot.studyExtent} = ${studyExtent}`;

    const summary = {
      boroughAbbrs: sql<Array<string>>`ARRAY_AGG(DISTINCT(${borough.abbr}))`,
      commercialFeet: sql<number>`SUM(${taxLot.commercialArea})`,
      residentialFeet: sql<number>`SUM(${taxLot.residentialArea})`,
      buildingClasses: sql<
        Array<string>
      >`ARRAY_AGG(DISTINCT(${taxLot.buildingClass}))`,
      landUseCategories: sql<
        Array<string>
      >`ARRAY_AGG(DISTINCT(${landUse.category}))`,
      maxFloors: sql<number>`MAX(${taxLot.floors})`,
      areaFeet: sql<number>`ROUND(ST_AREA(ST_UNION(${taxLot.lift}))::numeric, 2)`,
    };

    if (bufferFt) {
      const extentBufferQuery = this.db
        .select({
          bufferLift: sql<MultiPolygon>`ST_Buffer(
        ST_UNION(${taxLot.lift}), ${bufferFt}
      )`.as('buffer_li_ft'),
        })
        .from(projectToTaxLot)
        .leftJoin(taxLot, eq(projectToTaxLot.taxLotBbl, taxLot.bbl))
        .where(filter)
        .as('extentBufferQuery');

      const results = await this.db
        .select(summary)
        .from(extentBufferQuery)
        .leftJoin(
          taxLot,
          sql<MultiPolygon>`ST_Intersects(${taxLot.lift}, ${extentBufferQuery.bufferLift})`,
        )
        .leftJoin(borough, eq(taxLot.boroughCode, borough.id))
        .leftJoin(landUse, eq(taxLot.landUseCode, landUse.code));

      return results[0];
    } else {
      const results = await this.db
        .select(summary)
        .from(projectToTaxLot)
        .leftJoin(taxLot, eq(projectToTaxLot.taxLotBbl, taxLot.bbl))
        .leftJoin(borough, eq(taxLot.boroughCode, borough.id))
        .leftJoin(landUse, eq(taxLot.landUseCode, landUse.code))
        .where(filter);
      return results[0];
    }
  }

  async create(row: InsertProject) {
    const result = await this.db.transaction(async (tx) =>
      tx.insert(project).values(row).returning(),
    );
    return result[0];
  }

  async update({
    projectId,
    projectName,
    userId,
    siteBbls,
    areaBbls,
  }: {
    projectId: string;
    projectName?: string;
    userId?: string;
    siteBbls?: Array<string>;
    areaBbls?: Array<string>;
  }) {
    const result = await this.db.transaction(async (tx) => {
      if (projectName) {
        await tx
          .update(project)
          .set({
            name: projectName,
          })
          .where(eq(project.id, projectId));
      }

      if (userId) {
        await tx
          .update(project)
          .set({
            userId,
          })
          .where(eq(project.id, projectId));
      }

      if (siteBbls) {
        await tx
          .delete(projectToTaxLot)
          .where(
            sql`${projectToTaxLot.projectId} = ${projectId} and ${projectToTaxLot.studyExtent} = 'site'`,
          );

        const siteBblValues: Array<{
          projectId: string;
          studyExtent: Extent;
          taxLotBbl: string;
        }> = siteBbls.map((bbl) => ({
          projectId,
          studyExtent: 'site',
          taxLotBbl: bbl,
        }));

        await tx.insert(projectToTaxLot).values(siteBblValues);
      }

      if (areaBbls) {
        await tx
          .delete(projectToTaxLot)
          .where(
            sql`${projectToTaxLot.projectId} = ${projectId} and ${projectToTaxLot.studyExtent} = 'area'`,
          );

        const areaBblValues: Array<{
          projectId: string;
          studyExtent: Extent;
          taxLotBbl: string;
        }> = areaBbls.map((bbl) => ({
          projectId,
          studyExtent: 'area',
          taxLotBbl: bbl,
        }));

        await tx.insert(projectToTaxLot).values(areaBblValues);
      }

      return await tx
        .select({ projectId: project.id })
        .from(project)
        .where(eq(project.id, projectId));
    });

    return result[0];
  }

  async delete(id: string) {
    await this.db.transaction(async (tx) => {
      await tx.delete(projectToTaxLot).where(eq(projectToTaxLot.projectId, id));
      await tx.delete(project).where(eq(project.id, id));
    });
  }
}
