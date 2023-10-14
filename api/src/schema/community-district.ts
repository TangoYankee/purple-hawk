import { pgTable, serial, char } from 'drizzle-orm/pg-core';
import { borough } from './borough';
import { multiPolygonGeog, multiPolygonGeom } from 'drizzle-pgis';

export const communityDistrict = pgTable('community_district', {
  id: serial('id').primaryKey(),
  borough: char('borough', { length: 1 })
    .notNull()
    .references(() => borough.id),
  code: char('code', { length: 2 }).notNull(),
  wgs84: multiPolygonGeog('wgs84', 4326),
  lift: multiPolygonGeom('lift', 2263),
});
