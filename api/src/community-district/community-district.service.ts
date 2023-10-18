import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { Feature, MultiPolygon } from 'drizzle-pgis/types';
import { DbType, DB } from 'src/global/providers/db.provider';
import {
  SelectCommunityDistrict,
  communityDistrict,
} from 'src/schema/community-district';
import { taxLot } from 'src/schema/tax-lot';

export type CommunityDistrictFeature = Feature<
  MultiPolygon,
  { borough: string; code: string }
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
        wgs84: sql<string>`ST_AsGeoJSON(${taxLot.wgs84}, 6)`,
      })
      .from(communityDistrict);
    return results.map((result) => ({
      type: 'Feature',
      geometry: JSON.parse(result.wgs84) as MultiPolygon,
      id: result.id,
      properties: {
        borough: result.borough,
        code: result.code,
      },
    }));
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
        wgs84: sql<string>`ST_AsGeoJSON(${taxLot.wgs84}, 6)`,
      })
      .from(communityDistrict)
      .where(eq(communityDistrict.id, id));
    const result = results[0];
    return {
      type: 'Feature',
      geometry: JSON.parse(result.wgs84),
      id: result.id,
      properties: {
        borough: result.borough,
        code: result.code,
      },
    };
  }
}
