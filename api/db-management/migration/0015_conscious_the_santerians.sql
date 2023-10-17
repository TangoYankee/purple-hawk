DO $$ BEGIN
 CREATE TYPE "extent" AS ENUM('area', 'site');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_tax_lot" (
	"project_id" uuid NOT NULL,
	"study_extent" "extent",
	"tax_lot_bbl" char(10) NOT NULL
);
--> statement-breakpoint
DROP TABLE "project_area_tax_lot";--> statement-breakpoint
DROP TABLE "project_site_tax_lot";--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_site_id_unique";--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_area_id_unique";--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN IF EXISTS "site_id";--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN IF EXISTS "area_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_tax_lot" ADD CONSTRAINT "project_tax_lot_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_tax_lot" ADD CONSTRAINT "project_tax_lot_tax_lot_bbl_tax_lot_bbl_fk" FOREIGN KEY ("tax_lot_bbl") REFERENCES "tax_lot"("bbl") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
