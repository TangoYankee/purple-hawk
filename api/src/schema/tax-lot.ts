import { pgTable, char } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { polygon } from 'src/drizzle-pgis';

export const taxLot = pgTable('tax_lot', {
  id: char('id', { length: 10 }).primaryKey(),
  geom: polygon('geom', 4326),
});

export type SelectTaxLot = InferSelectModel<typeof taxLot>;
export type InsertTaxLot = InferInsertModel<typeof taxLot>;
