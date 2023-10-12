import { pgTable, char } from 'drizzle-orm/pg-core';
import { taxLot } from './tax-lot';
import { multiPolygonGeog } from '../../drizzle-pgis';

export const taxLotWGS84 = pgTable('tax_lot_wgs84', {
  taxLotBBL: char('tax_lot_bbl', { length: 10 })
    .notNull()
    .references(() => taxLot.bbl),
  geog: multiPolygonGeog('geog', 4326),
});
