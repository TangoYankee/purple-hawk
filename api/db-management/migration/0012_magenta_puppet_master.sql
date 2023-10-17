CREATE TABLE IF NOT EXISTS "land_use" (
	"code" char(2) PRIMARY KEY NOT NULL,
	"category" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lot_type" (
	"code" char(1) PRIMARY KEY NOT NULL,
	"label" text,
	"description" text
);
--> statement-breakpoint
DROP TABLE "tax_lot_long_island";--> statement-breakpoint
DROP TABLE "tax_lot_wgs84";--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "building_class" text;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "land_use_code" char(2);--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "commercial_area" integer;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "residential_area" integer;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "office_area" integer;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "retail_area" integer;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "garage_area" integer;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "storage_area" integer;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "factory_area" integer;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "other_area" integer;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "floors" numeric;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "residential_units" integer;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "total_units" integer;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "lot_type" char(1);--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "landmark" text;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "built_far" numeric;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "residential_far" numeric;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "commercial_far" numeric;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "facility_far" numeric;--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "wgs84" geography(multiPolygon, 4326);--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "lift" geometry(multiPolygon,2263);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tax_lot" ADD CONSTRAINT "tax_lot_land_use_code_land_use_code_fk" FOREIGN KEY ("land_use_code") REFERENCES "land_use"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tax_lot" ADD CONSTRAINT "tax_lot_lot_type_lot_type_code_fk" FOREIGN KEY ("lot_type") REFERENCES "lot_type"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
