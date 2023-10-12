CREATE TABLE IF NOT EXISTS "building_long_island" (
	"bin" char(7) NOT NULL,
	"geom" geometry(multiPolygon,2263)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "building_wgs84" (
	"bin" char(7) NOT NULL,
	"geog" geography(multiPolygon, 4326)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "building" (
	"id_number" char(7) PRIMARY KEY NOT NULL,
	"construction_year" integer,
	"roof_height" numeric,
	"ground_elevation" integer,
	"feat_code" char(4)
);
--> statement-breakpoint
ALTER TABLE "tax_lot" RENAME COLUMN "boroughCode" TO "borough_code";--> statement-breakpoint
ALTER TABLE "tax_lot" DROP CONSTRAINT "tax_lot_boroughCode_borough_id_fk";
--> statement-breakpoint
ALTER TABLE "tax_lot" ALTER COLUMN "bbl" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tax_lot" ADD CONSTRAINT "tax_lot_borough_code_borough_id_fk" FOREIGN KEY ("borough_code") REFERENCES "borough"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "building_long_island" ADD CONSTRAINT "building_long_island_bin_building_id_number_fk" FOREIGN KEY ("bin") REFERENCES "building"("id_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "building_wgs84" ADD CONSTRAINT "building_wgs84_bin_building_id_number_fk" FOREIGN KEY ("bin") REFERENCES "building"("id_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "tax_lot" ADD CONSTRAINT "tax_lot_bbl_unique" UNIQUE("bbl");
