import { pgTable, char } from 'drizzle-orm/pg-core';
import { taxLot } from './tax-lot';
import { multiPolygonGeom } from '../../../drizzle-pgis';

export const taxLotLongIsland = pgTable('tax_lot_long_island', {
  taxLotBBL: char('tax_lot_bbl', { length: 10 })
    .notNull()
    .references(() => taxLot.bbl),
  geom: multiPolygonGeom('geom', 2263),
});
