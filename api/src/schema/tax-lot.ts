import { pgTable, char } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { geometry, Point } from 'src/drizzle-pg-geotype';

export const taxLot = pgTable('tax_lot', {
  id: char('id', { length: 10 }).notNull(),
  geom: geometry<Point>('geom', { simpleFeatureLabel: 'point' }),
});

export type SelectTaxLot = InferSelectModel<typeof taxLot>;
export type InsertProject = InferInsertModel<typeof taxLot>;
