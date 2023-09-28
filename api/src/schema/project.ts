import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const project = pgTable('project', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
});

export type SelectProject = InferSelectModel<typeof project>;
export type InsertProject = InferInsertModel<typeof project>;
