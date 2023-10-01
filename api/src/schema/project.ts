import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';

export const project = pgTable('project', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  siteId: serial('site_id').unique(),
});

export type SelectProject = InferSelectModel<typeof project>;
export type InsertProject = InferInsertModel<typeof project>;
