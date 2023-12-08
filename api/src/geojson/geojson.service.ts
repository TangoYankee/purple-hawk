import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { ST_AsGeoJSON } from 'drizzle-pgis/spatial-type';
import { MultiPolygon } from 'drizzle-pgis/types';
import { resultAsGeoJSON } from 'drizzle-pgis/utils';
import { DbType, DB } from 'src/global/providers/db.provider';
import { borough } from 'src/schema/borough';
import {
  CommunityDistrictGeoJSON,
  CommunityDistrictProperties,
  CommunityDistrictTraitsGeog,
  communityDistrict,
} from 'src/schema/community-district';
import { facility } from 'src/schema/facility';
import { landUse } from 'src/schema/land-use';
import { Extent, projectToTaxLot } from 'src/schema/project-tax-lot';
import { taxLot } from 'src/schema/tax-lot';

@Injectable()
export class GeoJSONService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAllCommunityDistrict(): Promise<Array<CommunityDistrictGeoJSON>> {
    const results: Array<CommunityDistrictTraitsGeog> = await this.db
      .select({
        id: communityDistrict.id,
        borough: communityDistrict.borough,
        code: communityDistrict.code,
        wgs84: ST_AsGeoJSON<MultiPolygon>(communityDistrict.wgs84, 6),
      })
      .from(communityDistrict);
    return results.map((result) =>
      resultAsGeoJSON<
        CommunityDistrictTraitsGeog,
        CommunityDistrictProperties,
        MultiPolygon
      >(result, 'wgs84', 'id'),
    );
  }

  async getByIdCommunityDistrict(
    id: number,
  ): Promise<CommunityDistrictGeoJSON> {
    const results: Array<CommunityDistrictTraitsGeog> = await this.db
      .select({
        id: communityDistrict.id,
        borough: communityDistrict.borough,
        code: communityDistrict.code,
        wgs84: ST_AsGeoJSON<MultiPolygon>(communityDistrict.wgs84, 6),
      })
      .from(communityDistrict)
      .where(eq(communityDistrict.id, id));
    const result = results[0];

    return resultAsGeoJSON<
      CommunityDistrictTraitsGeog,
      CommunityDistrictProperties,
      MultiPolygon
    >(result, 'wgs84', 'id');
  }

  async getByProjectIdExtent({
    projectId,
    studyExtent,
    bufferFt,
  }: {
    projectId: string;
    studyExtent: Extent;
    bufferFt: number | null;
  }) {
    const summary = {
      taxLotBbl: taxLot.bbl,
      boroughName: borough.name,
      commercialArea: taxLot.commercialArea,
      residentialArea: taxLot.residentialArea,
      buildingClass: taxLot.buildingClass,
      landUseCategory: landUse.category,
      floors: taxLot.floors,
      residentialUnits: taxLot.residentialUnits,
      landArea: sql<number>`ROUND(ST_AREA(${taxLot.lift})::numeric)`.as(
        'land_area',
      ),
      wgs84: ST_AsGeoJSON<MultiPolygon>(taxLot.wgs84, 6),
    };

    const filter = sql`${projectToTaxLot.projectId} = ${projectId} AND ${projectToTaxLot.studyExtent} = ${studyExtent}`;
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

      return results.map((result) =>
        resultAsGeoJSON(result, 'wgs84', 'taxLotBbl'),
      );
    } else {
      const results = await this.db
        .select(summary)
        .from(projectToTaxLot)
        .leftJoin(taxLot, eq(projectToTaxLot.taxLotBbl, taxLot.bbl))
        .leftJoin(borough, eq(taxLot.boroughCode, borough.id))
        .leftJoin(landUse, eq(taxLot.landUseCode, landUse.code))
        .where(filter);
      return results.map((result) =>
        resultAsGeoJSON(result, 'wgs84', 'taxLotBbl'),
      );
    }
  }

  async getByProjectIdCommunityDistrict({
    projectId,
    studyExtent,
    bufferFt,
  }: {
    projectId: string;
    studyExtent: Extent;
    bufferFt: number | null;
  }) {
    const projectLift =
      bufferFt === null
        ? sql<MultiPolygon>`ST_UNION(${taxLot.lift})`
        : sql<MultiPolygon>`ST_BUFFER(ST_UNION(${taxLot.lift}), ${bufferFt})`;

    const projectExtent = this.db
      .select({
        lift: projectLift.as('project_lift'),
      })
      .from(projectToTaxLot)
      .leftJoin(taxLot, eq(projectToTaxLot.taxLotBbl, taxLot.bbl))
      .where(
        sql`${projectToTaxLot.projectId} = ${projectId} AND ${projectToTaxLot.studyExtent} = ${studyExtent}`,
      )
      .as('project_extent');

    const results = await this.db
      .select({
        id: communityDistrict.id,
        borough: borough.name,
        code: communityDistrict.code,
        wgs84: sql<MultiPolygon>`ST_AsGeoJSON(ST_Transform(ST_Intersection(${projectExtent.lift}, ${communityDistrict.lift}), 4326), 6)`,
      })
      .from(projectExtent)
      .leftJoin(
        communityDistrict,
        sql`ST_Intersects(${projectExtent.lift}, ${communityDistrict.lift})`,
      )
      .leftJoin(borough, eq(communityDistrict.borough, borough.id));

    return results.map((result) => resultAsGeoJSON(result, 'wgs84', 'id'));
  }

  // Limit to 1000 to prevent crashing
  async getAllFacility() {
    const results = await this.db
      .select({
        uid: facility.uid,
        name: facility.name,
        type: facility.type,
        bin: facility.bin,
        bbl: facility.bbl,
        addressBuildingCode: facility.addressBuildingCode,
        addressStreetName: facility.addressStreetName,
        capacity: facility.capacity,
        capacityType: facility.capacityType,
        serviceArea: facility.facilityServiceArea,
        operatingEntity: facility.operatingEntity,
        oversightAgency: facility.oversightAgency,
        wgs84: ST_AsGeoJSON(facility.wgs84, 6),
      })
      .from(facility)
      .limit(1000);

    return results.map((result) => resultAsGeoJSON(result, 'wgs84', 'uid'));
  }

  async getByIdFacility(uid: string, bufferFt: number | null) {
    if (bufferFt) {
      const facilitySelf = alias(facility, 'facilitySelf');
      const results = await this.db
        .select({
          uid: facility.uid,
          name: facility.name,
          type: facility.type,
          bin: facility.bin,
          bbl: facility.bbl,
          addressBuildingCode: facility.addressBuildingCode,
          addressStreetName: facility.addressStreetName,
          capacity: facility.capacity,
          capacityType: facility.capacityType,
          serviceArea: facility.facilityServiceArea,
          operatingEntity: facility.operatingEntity,
          oversightAgency: facility.oversightAgency,
          wgs84: ST_AsGeoJSON(facility.wgs84, 6),
        })
        .from(facility)
        .leftJoin(
          facilitySelf,
          sql`ST_DWithin(${facility.lift}, ${facilitySelf.lift}, ${bufferFt})`,
        )
        .where(eq(facilitySelf.uid, uid));
      return results.map((result) => resultAsGeoJSON(result, 'wgs84', 'uid'));
    } else {
      const results = await this.db
        .select({
          uid: facility.uid,
          name: facility.name,
          type: facility.type,
          bin: facility.bin,
          bbl: facility.bbl,
          addressBuildingCode: facility.addressBuildingCode,
          addressStreetName: facility.addressStreetName,
          capacity: facility.capacity,
          capacityType: facility.capacityType,
          serviceArea: facility.facilityServiceArea,
          operatingEntity: facility.operatingEntity,
          oversightAgency: facility.oversightAgency,
          wgs84: ST_AsGeoJSON(facility.wgs84, 6),
        })
        .from(facility)
        .where(eq(facility.uid, uid));

      return results.map((result) => resultAsGeoJSON(result, 'wgs84', 'uid'));
    }
  }
}
