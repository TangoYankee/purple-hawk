import { pgTable, char } from 'drizzle-orm/pg-core';
import { taxLot } from './tax-lot';
import { polygonGeom } from '../../drizzle-pgis';

export const taxLotLongIsland = pgTable('tax_lot_long_island', {
  tax_lot_id: char('tax_lot_id', { length }).references(() => taxLot.id),
  geom: polygonGeom('geom', 2263),
});
