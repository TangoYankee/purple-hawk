import { pgTable, text } from 'drizzle-orm/pg-core';
import { multiPolygonGeom } from '../../../drizzle-pgis';
import { zoningDistrict } from '.';

export const zoningDistrictLongIsland = pgTable('zoning_district_long_island', {
  id: text('id').references(() => zoningDistrict.id),
  geom: multiPolygonGeom('geom', 2263),
});
