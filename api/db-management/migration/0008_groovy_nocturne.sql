CREATE TABLE IF NOT EXISTS "zoning_district" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "zoning_district_long_island" (
	"id" text,
	"geom" geometry(multiPolygon,2263)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "zoning_district_wgs84" (
	"id" text,
	"geog" geography(multiPolygon, 4326)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "zoning_district_long_island" ADD CONSTRAINT "zoning_district_long_island_id_zoning_district_id_fk" FOREIGN KEY ("id") REFERENCES "zoning_district"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "zoning_district_wgs84" ADD CONSTRAINT "zoning_district_wgs84_id_zoning_district_id_fk" FOREIGN KEY ("id") REFERENCES "zoning_district"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
