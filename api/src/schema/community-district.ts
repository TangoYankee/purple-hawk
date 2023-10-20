import { pgTable, serial, char } from 'drizzle-orm/pg-core';
import { borough } from './borough';
import { multiPolygonGeog, multiPolygonGeom } from '../../drizzle-pgis';
import { InferSelectModel } from 'drizzle-orm';
import { Feature, MultiPolygon } from 'drizzle-pgis/types';

export const communityDistrict = pgTable('community_district', {
  id: serial('id').primaryKey(),
  borough: char('borough', { length: 1 })
    .notNull()
    .references(() => borough.id),
  code: char('code', { length: 2 }).notNull(),
  wgs84: multiPolygonGeog('wgs84', 4326),
  lift: multiPolygonGeom('lift', 2263),
});

export type SelectCommunityDistrict = InferSelectModel<
  typeof communityDistrict
>;

export type CommunityDistrictId = Pick<SelectCommunityDistrict, 'id'>;

export type CommunityDistrictTraits = Omit<
  SelectCommunityDistrict,
  'wgs84' | 'lift'
>;

export type CommunityDistrictTraitsGeog = Omit<SelectCommunityDistrict, 'lift'>;

export type CommunityDistrictSpatial = Pick<
  SelectCommunityDistrict,
  'wgs84' | 'lift'
>;

export type CommunityDistrictProperties = Omit<
  SelectCommunityDistrict,
  keyof CommunityDistrictId | keyof CommunityDistrictSpatial
>;

export type CommunityDistrictGeoJSON = Feature<
  MultiPolygon,
  CommunityDistrictProperties
>;
