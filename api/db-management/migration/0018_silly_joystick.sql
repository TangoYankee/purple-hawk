DROP TABLE "building_long_island";--> statement-breakpoint
DROP TABLE "building_wgs84";--> statement-breakpoint
DROP TABLE "zoning_district_long_island";--> statement-breakpoint
DROP TABLE "zoning_district_wgs84";--> statement-breakpoint
ALTER TABLE "building" ADD COLUMN "wgs84" geography(multiPolygon, 4326);--> statement-breakpoint
ALTER TABLE "building" ADD COLUMN "lift" geometry(multiPolygon,2263);--> statement-breakpoint
ALTER TABLE "zoning_district" ADD COLUMN "wgs84" geography(multiPolygon, 4326);--> statement-breakpoint
ALTER TABLE "zoning_district" ADD COLUMN "lift" geometry(multiPolygon,2263);