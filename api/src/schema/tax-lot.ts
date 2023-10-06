import { pgTable, char } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export const taxLot = pgTable('tax_lot', {
  id: char('id', { length: 10 }).primaryKey(),
});

export type SelectTaxLot = InferSelectModel<typeof taxLot>;
export type InsertTaxLot = InferInsertModel<typeof taxLot>;
