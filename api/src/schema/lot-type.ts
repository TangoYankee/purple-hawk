import { InferSelectModel } from 'drizzle-orm';
import { pgTable, char, text } from 'drizzle-orm/pg-core';

export const lotType = pgTable('lot_type', {
  code: char('code', { length: 1 }).primaryKey(),
  label: text('label'),
  description: text('description'),
});

export type SelectLotType = InferSelectModel<typeof lotType>;
