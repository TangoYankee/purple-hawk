import { pgTable, char, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { project } from './project';
import { taxLot } from './tax-lot';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm/table';

export const extent = pgEnum('extent', ['area', 'site']);

export const projectToTaxLot = pgTable('project_tax_lot', {
  projectId: uuid('project_id')
    .notNull()
    .references(() => project.id),
  studyExtent: extent('study_extent').notNull(),
  taxLotBbl: char('tax_lot_bbl', { length: 10 })
    .notNull()
    .references(() => taxLot.bbl),
});

export type Extent = 'area' | 'site';

export type SelectProjectToTaxLot = InferSelectModel<typeof projectToTaxLot>;
export type InsertProjectToTaxLot = InferInsertModel<typeof projectToTaxLot>;

export type ProjectToTaxLotProjectId = Pick<SelectProjectToTaxLot, 'projectId'>;

export type ProjectToTaxLotProperties = Omit<
  SelectProjectToTaxLot,
  keyof ProjectToTaxLotProjectId
>;

export type ProjectToTaxLotProjectExtent = Pick<
  SelectProjectToTaxLot,
  'projectId' | 'studyExtent'
>;

export type ProjectToTaxLotExtent = Pick<SelectProjectToTaxLot, 'studyExtent'>;
