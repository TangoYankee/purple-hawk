import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { ST_AsGeoJSON } from 'drizzle-pgis/spatial-type';
import { MultiPolygon } from 'drizzle-pgis/types';
import { resultAsGeoJSON } from 'drizzle-pgis/utils';
import { CommunityDistrictProperties } from 'src/community-district/community-district.service';
import { DbType, DB } from 'src/global/providers/db.provider';
import { communityDistrict } from 'src/schema/community-district';
import { taxLot } from 'src/schema/tax-lot';

@Injectable()
export class GeoJSONService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAllCommunityDistrict() {
    const results = await this.db
      .select({
        id: communityDistrict.id,
        borough: communityDistrict.borough,
        code: communityDistrict.code,
        wgs84: ST_AsGeoJSON(communityDistrict.wgs84, 6),
      })
      .from(communityDistrict);
    return results.map((result) =>
      resultAsGeoJSON<
        MultiPolygon,
        { borough: string; code: string },
        { id: number; wgs84: string } & CommunityDistrictProperties
      >(result, 'wgs84', 'id'),
    );
  }

  async getByIdCommunityDistrict(id: number) {
    const results = await this.db
      .select({
        id: communityDistrict.id,
        borough: communityDistrict.borough,
        code: communityDistrict.code,
        wgs84: ST_AsGeoJSON(communityDistrict.wgs84, 6),
      })
      .from(communityDistrict)
      .where(eq(communityDistrict.id, id));
    const result = results[0];

    return resultAsGeoJSON<
      MultiPolygon,
      { borough: string; code: string },
      { id: number; wgs84: string } & CommunityDistrictProperties
    >(result, 'wgs84', 'id');
  }

  async getByCommunityDistrictIdTaxLot(id: number) {
    const results = await this.db
      .select({
        communityDistrictId: communityDistrict.id,
        taxLotBbl: taxLot.bbl,
        taxLotWgs84: ST_AsGeoJSON(taxLot.wgs84, 6),
      })
      .from(communityDistrict)
      .leftJoin(
        taxLot,
        sql`ST_INTERSECTS(${communityDistrict.lift}, ${taxLot.lift})`,
      )
      .where(eq(communityDistrict.id, id));

    return results.map((result) =>
      resultAsGeoJSON(result, 'taxLotWgs84', 'taxLotBbl'),
    );
  }
}
