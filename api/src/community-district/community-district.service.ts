import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { ST_AsGeoJSON } from 'drizzle-pgis/spatial-type';
import { Feature, MultiPolygon } from 'drizzle-pgis/types';
import { resultAsGeoJSON } from 'drizzle-pgis/utils';
import { DbType, DB } from 'src/global/providers/db.provider';
import {
  SelectCommunityDistrict,
  communityDistrict,
} from 'src/schema/community-district';

export type CommunityDistrictProperties = { borough: string; code: string };

export type CommunityDistrictFeature = Feature<
  MultiPolygon,
  CommunityDistrictProperties
>;

@Injectable()
export class CommunityDistrictService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getAll(): Promise<Array<Partial<SelectCommunityDistrict>>> {
    return await this.db
      .select({
        id: communityDistrict.id,
        borough: communityDistrict.borough,
        code: communityDistrict.code,
      })
      .from(communityDistrict);
  }

  async getAllGeoJSON(): Promise<Array<CommunityDistrictFeature>> {
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

  async getById(id: number): Promise<Partial<SelectCommunityDistrict>> {
    const result = await this.db
      .select({
        id: communityDistrict.id,
        borough: communityDistrict.borough,
        code: communityDistrict.code,
      })
      .from(communityDistrict)
      .where(eq(communityDistrict.id, id));
    return result[0];
  }

  async getByIdGeoJSON(id: number): Promise<CommunityDistrictFeature> {
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
      CommunityDistrictProperties,
      { id: number; wgs84: string } & CommunityDistrictProperties
    >(result, 'wgs84', 'id');
  }
}
