import { pgTable, char } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { geometry } from 'src/drizzle-pgis';
import { Polygon } from 'src/drizzle-pgis/types';

export const taxLot = pgTable('tax_lot', {
  id: char('id', { length: 10 }).primaryKey(),
  geom: geometry<Polygon>('geom', { simpleFeatureLabel: 'polygon' }),
});

export type SelectTaxLot = InferSelectModel<typeof taxLot>;
export type InsertTaxLot = InferInsertModel<typeof taxLot>;
