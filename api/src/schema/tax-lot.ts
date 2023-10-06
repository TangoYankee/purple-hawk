import { pgTable, char } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { polygonGeog, polygonGeom } from '../../drizzle-pgis';

export const taxLot = pgTable('tax_lot', {
  id: char('id', { length: 10 }).primaryKey(),
  wgs84: polygonGeog('wgs84', 4326),
  longIslandFt: polygonGeom('long_island_ft', 2263),
});

export type SelectTaxLot = InferSelectModel<typeof taxLot>;
export type InsertTaxLot = InferInsertModel<typeof taxLot>;
