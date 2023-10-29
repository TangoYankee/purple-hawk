import { InferSelectModel } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { multiPolygonGeog, multiPolygonGeom } from '../../drizzle-pgis';

export const zoningDistrict = pgTable('zoning_district', {
  id: text('id').primaryKey(),
  code: text('code'),
  wgs84: multiPolygonGeog('wgs84', 4326),
  lift: multiPolygonGeom('lift', 2263),
});

export type SelectZoningDistrict = InferSelectModel<typeof zoningDistrict>;
