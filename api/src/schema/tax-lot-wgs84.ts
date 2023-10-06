import { pgTable, char } from 'drizzle-orm/pg-core';
import { taxLot } from './tax-lot';
import { polygonGeog } from '../../drizzle-pgis';

export const taxLotWGS84 = pgTable('tax_lot_wgs84', {
  tax_lot_id: char('tax_lot_id', { length }).references(() => taxLot.id),
  geog: polygonGeog('geog', 4326),
});
