import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { pointGeog, pointGeom } from '../../drizzle-pgis';
import { InferSelectModel } from 'drizzle-orm';

export const neighborhood = pgTable('neighborhood', {
  id: serial('id').primaryKey(),
  name: text('name'),
  wgs84: pointGeog('wgs84', 4326),
  lift: pointGeom('lift', 2263),
});

export type SelectNeighborhood = InferSelectModel<typeof neighborhood>;
