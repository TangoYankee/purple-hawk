import { pgTable, text } from 'drizzle-orm/pg-core';

export const zoningDistrict = pgTable('zoning_district', {
  id: text('id').primaryKey(),
  code: text('code'),
});

export { zoningDistrictLongIsland } from './long-island';
export { zoningDistrictWGS84 } from './wgs84';
