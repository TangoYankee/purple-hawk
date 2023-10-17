import { InferSelectModel } from 'drizzle-orm';
import { pgTable, char, text } from 'drizzle-orm/pg-core';

export const borough = pgTable('borough', {
  id: char('id', { length: 1 }).primaryKey(),
  name: text('name'),
  abbr: char('abbr', { length: 2 }),
});

export type SelectBorough = InferSelectModel<typeof borough>;
