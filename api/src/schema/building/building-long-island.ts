import { pgTable, char } from 'drizzle-orm/pg-core';
import { building } from './building';
import { multiPolygonGeom } from 'drizzle-pgis';

export const buildingLongIsland = pgTable('building_long_island', {
  bin: char('bin', { length: 7 })
    .notNull()
    .references(() => building.id_number),
  geom: multiPolygonGeom('geom', 2263),
});
