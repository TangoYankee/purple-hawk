import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { project } from './project';
import { taxLot } from './tax-lot';

export const projectSiteToTaxLot = pgTable('project_site_tax_lot', {
  projectSiteId: integer('project_site_id')
    .notNull()
    .references(() => project.siteId),
  taxLotId: text('tax_lot_id')
    .notNull()
    .references(() => taxLot.id),
});
