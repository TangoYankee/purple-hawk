import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { multiPolygonGeog, multiPolygonGeom } from '../../drizzle-pgis';
import { InferSelectModel } from 'drizzle-orm';

export const fresh = pgTable('fresh', {
  id: serial('id').primaryKey(),
  class: text('class'),
  wgs84: multiPolygonGeog('wgs84', 4326),
  lift: multiPolygonGeom('lift', 2263),
});

export type SelectFresh = InferSelectModel<typeof fresh>;
