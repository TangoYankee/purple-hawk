import { InferSelectModel } from 'drizzle-orm';
import { pgTable, char, text } from 'drizzle-orm/pg-core';

export const landUse = pgTable('land_use', {
  code: char('code', { length: 2 }).primaryKey(),
  category: text('category'),
});

export type SelectLandUse = InferSelectModel<typeof landUse>;
