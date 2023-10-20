import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { ST_AsGeoJSON } from 'drizzle-pgis/spatial-type';
import { MultiPolygon } from 'drizzle-pgis/types';
import { resultAsGeoJSON } from 'drizzle-pgis/utils';
import { CommunityDistrictProperties } from 'src/community-district/community-district.service';
import { DbType, DB } from 'src/global/providers/db.provider';
import { communityDistrict } from 'src/schema/community-district';

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
}
