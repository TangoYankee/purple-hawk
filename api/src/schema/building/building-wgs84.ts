import { pgTable, char } from 'drizzle-orm/pg-core';
import { building } from './building';
import { multiPolygonGeog } from 'drizzle-pgis';

export const buildingWGS84 = pgTable('building_wgs84', {
  bin: char('bin', { length: 7 })
    .notNull()
    .references(() => building.id_number),
  geog: multiPolygonGeog('geog', 4326),
});
