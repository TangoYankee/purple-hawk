import { pgTable, char, text, integer, numeric } from 'drizzle-orm/pg-core';
import { multiPolygonGeog, multiPolygonGeom } from '../../drizzle-pgis';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { landUse } from './land-use';
import { borough } from './borough';
import { lotType } from './lot-type';

export const taxLot = pgTable('tax_lot', {
  bbl: char('bbl', { length: 10 }).primaryKey(),
  boroughCode: char('borough_code', { length: 1 }).references(() => borough.id),
  block: text('block'),
  lot: text('lot'),
  address: text('address'),
  buildingClass: text('building_class'),
  landUseCode: char('land_use_code', { length: 2 }).references(
    () => landUse.code,
  ),
  commercialArea: integer('commercial_area'),
  residentialArea: integer('residential_area'),
  officeArea: integer('office_area'),
  retailArea: integer('retail_area'),
  garageArea: integer('garage_area'),
  storageArea: integer('storage_area'),
  factoryArea: integer('factory_area'),
  otherArea: integer('other_area'),
  floors: numeric('floors'),
  residentialUnits: integer('residential_units'),
  totalUnits: integer('total_units'),
  lotType: char('lot_type', { length: 1 }).references(() => lotType.code),
  landmark: text('landmark'),
  builtFAR: numeric('built_far'),
  residentialFAR: numeric('residential_far'),
  commercialFAR: numeric('commercial_far'),
  facilityFAR: numeric('facility_far'),
  wgs84: multiPolygonGeog('wgs84', 4326),
  lift: multiPolygonGeom('lift', 2263),
});

export type SelectTaxLot = InferSelectModel<typeof taxLot>;
export type InsertTaxLot = InferInsertModel<typeof taxLot>;
