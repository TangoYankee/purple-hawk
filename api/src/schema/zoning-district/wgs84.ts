import { pgTable, text } from 'drizzle-orm/pg-core';
import { multiPolygonGeog } from 'drizzle-pgis';
import { zoningDistrict } from '.';

export const zoningDistrictWGS84 = pgTable('zoning_district_wgs84', {
  id: text('id').references(() => zoningDistrict.id),
  geog: multiPolygonGeog('geog', 4326),
});
