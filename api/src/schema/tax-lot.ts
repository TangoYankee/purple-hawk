import { pgTable, char, text } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { borough } from './borough';

export const taxLot = pgTable('tax_lot', {
  id: text('id').primaryKey(),
  bbl: text('bbl'),
  boroughCode: char('boroughCode', { length: 1 }).references(() => borough.id),
  block: text('block'),
  lot: text('lot'),
});

export type SelectTaxLot = InferSelectModel<typeof taxLot>;
export type InsertTaxLot = InferInsertModel<typeof taxLot>;
