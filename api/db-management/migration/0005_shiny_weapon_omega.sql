CREATE TABLE IF NOT EXISTS "borough" (
	"id" char(1) PRIMARY KEY NOT NULL,
	"name" text,
	"abbr" char(2)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tax_lot_long_island" (
	"tax_lot_id" text NOT NULL,
	"geom" geometry(multiPolygon,2263)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tax_lot_wgs84" (
	"tax_lot_id" text NOT NULL,
	"geog" geography(multiPolygon, 4326)
);
--> statement-breakpoint
ALTER TABLE "project_site_tax_lot" ALTER COLUMN "tax_lot_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tax_lot" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "bbl" text;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "boroughCode" char(1);--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "block" text;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "lot" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tax_lot" ADD CONSTRAINT "tax_lot_boroughCode_borough_id_fk" FOREIGN KEY ("boroughCode") REFERENCES "borough"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "tax_lot" DROP COLUMN IF EXISTS "wgs84";--> statement-breakpoint
ALTER TABLE "tax_lot" DROP COLUMN IF EXISTS "long_island_ft";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tax_lot_long_island" ADD CONSTRAINT "tax_lot_long_island_tax_lot_id_tax_lot_id_fk" FOREIGN KEY ("tax_lot_id") REFERENCES "tax_lot"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tax_lot_wgs84" ADD CONSTRAINT "tax_lot_wgs84_tax_lot_id_tax_lot_id_fk" FOREIGN KEY ("tax_lot_id") REFERENCES "tax_lot"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
