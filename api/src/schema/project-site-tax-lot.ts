import { pgTable, char, integer } from 'drizzle-orm/pg-core';
import { project } from './project';
import { taxLot } from './tax-lot';

export const projectSiteToTaxLot = pgTable('project_site_tax_lot', {
  projectSiteId: integer('project_site_id')
    .notNull()
    .references(() => project.siteId),
  taxLotId: char('tax_lot_id', { length: 10 })
    .notNull()
    .references(() => taxLot.id),
});
