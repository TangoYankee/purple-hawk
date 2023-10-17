import { pgTable, char, integer } from 'drizzle-orm/pg-core';
import { project } from './project';
import { taxLot } from './tax-lot';

export const projectAreaToTaxLot = pgTable('project_area_tax_lot', {
  projectAreaId: integer('project_area_id')
    .notNull()
    .references(() => project.areaId),
  taxLotBBL: char('tax_lot_bbl', { length: 10 })
    .notNull()
    .references(() => taxLot.bbl),
});
