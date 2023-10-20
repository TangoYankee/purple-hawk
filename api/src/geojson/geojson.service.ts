import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { ST_AsGeoJSON } from 'drizzle-pgis/spatial-type';
import { MultiPolygon } from 'drizzle-pgis/types';
import { resultAsGeoJSON } from 'drizzle-pgis/utils';
import { DbType, DB } from 'src/global/providers/db.provider';
import {
  CommunityDistrictGeoJSON,
  CommunityDistrictProperties,
  CommunityDistrictTraitsGeog,
  communityDistrict,
} from 'src/schema/community-district';

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
}
