import { pgTable, text } from 'drizzle-orm/pg-core';
import { taxLot } from './tax-lot';
import { multiPolygonGeom } from '../../drizzle-pgis';

export const taxLotLongIsland = pgTable('tax_lot_long_island', {
  tax_lot_id: text('tax_lot_id')
    .notNull()
    .references(() => taxLot.id),
  geom: multiPolygonGeom('geom', 2263),
});
