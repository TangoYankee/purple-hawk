import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';
import { user } from './user';

export const project = pgTable('project', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id),
  siteId: serial('site_id').unique(),
  areaId: serial('area_id').unique(),
});

export type SelectProject = InferSelectModel<typeof project>;
export type InsertProject = InferInsertModel<typeof project>;
