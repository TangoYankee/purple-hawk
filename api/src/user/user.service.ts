import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DbType, DB } from 'src/global/providers/db.provider';
import { project } from 'src/schema/project';
import { projectToTaxLot } from 'src/schema/project-tax-lot';
import { InsertUser, user } from 'src/schema/user';

@Injectable()
export class UserService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAll() {
    return await this.db
      .select({
        id: user.id,
        name: user.name,
      })
      .from(user);
  }

  async getById(id: string) {
    const result = await this.db
      .select({
        id: user.id,
        name: user.name,
      })
      .from(user)
      .where(eq(user.id, id));
    return result[0];
  }

  async getByIdProject({ userId }: { userId: string }) {
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
      .rightJoin(project, eq(siteQuery.siteProjectId, project.id))
      .where(eq(project.userId, userId));
  }

  async create(row: InsertUser) {
    const result = await this.db.transaction(
      async (tx) => await tx.insert(user).values(row).returning(),
    );
    return result[0];
  }

  async update(id: string, values: { name: string }) {
    const result = await this.db.transaction(async (tx) =>
      tx.update(user).set(values).where(eq(user.id, id)).returning(),
    );

    return result[0];
  }
}
