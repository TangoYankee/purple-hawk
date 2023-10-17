import { InferSelectModel } from 'drizzle-orm';
import { pgTable, char, integer, numeric } from 'drizzle-orm/pg-core';

export const building = pgTable('building', {
  idNumber: char('id_number', { length: 7 }).primaryKey(),
  constructionYear: integer('construction_year'),
  roofHeight: numeric('roof_height'),
  groundElevation: integer('ground_elevation'),
  featCode: char('feat_code', { length: 4 }),
});

export type SelectBuilding = InferSelectModel<typeof building>;
