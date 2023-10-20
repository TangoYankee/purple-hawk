import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Feature, MultiPolygon } from 'drizzle-pgis/types';
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
}
