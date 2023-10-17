import { pgTable, char, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { project } from './project';
import { taxLot } from './tax-lot';

export const extent = pgEnum('extent', ['area', 'site']);

export const projectToTaxLot = pgTable('project_tax_lot', {
  projectId: uuid('project_id')
    .notNull()
    .references(() => project.id),
  study_extent: extent('study_extent'),
  taxLotBBL: char('tax_lot_bbl', { length: 10 })
    .notNull()
    .references(() => taxLot.bbl),
});
