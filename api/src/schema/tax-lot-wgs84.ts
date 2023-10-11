import { pgTable, text } from 'drizzle-orm/pg-core';
import { taxLot } from './tax-lot';
import { multiPolygonGeog } from '../../drizzle-pgis';

export const taxLotWGS84 = pgTable('tax_lot_wgs84', {
  tax_lot_id: text('tax_lot_id')
    .notNull()
    .references(() => taxLot.id),
  geog: multiPolygonGeog('geog', 4326),
});
