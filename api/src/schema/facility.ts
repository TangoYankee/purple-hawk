import { pgTable, char, text, pgEnum, numeric } from 'drizzle-orm/pg-core';
import { pointGeog, pointGeom } from '../../drizzle-pgis';

export const serviceArea = pgEnum('service_area', ['Local', 'Regional']);

export const facility = pgTable('facility', {
  uid: text('uid').primaryKey(),
  name: text('name'),
  type: text('type'),
  bin: char('bin', { length: 7 }),
  bbl: char('bbl', { length: 10 }),
  addressBuildingCode: text('address_building_code'),
  addressStreetName: text('address_street_name'),
  capacity: numeric('capacity'),
  capacityType: text('capacity_type'),
  facilityServiceArea: serviceArea('facility_service_area').notNull(),
  operatingEntity: text('operating_entity'),
  oversightAgency: text('oversight_agency'),
  wgs84: pointGeog('wgs84', 4326),
  lift: pointGeom('lift', 2263),
});
