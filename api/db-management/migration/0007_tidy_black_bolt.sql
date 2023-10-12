ALTER TABLE "tax_lot" DROP CONSTRAINT "tax_lot_bbl_unique";--> statement-breakpoint
ALTER TABLE "project_site_tax_lot" DROP CONSTRAINT "project_site_tax_lot_tax_lot_id_tax_lot_id_fk";
--> statement-breakpoint
ALTER TABLE "tax_lot_long_island" DROP CONSTRAINT "tax_lot_long_island_tax_lot_id_tax_lot_id_fk";
--> statement-breakpoint
ALTER TABLE "tax_lot_wgs84" DROP CONSTRAINT "tax_lot_wgs84_tax_lot_id_tax_lot_id_fk";
--> statement-breakpoint
ALTER TABLE "tax_lot" DROP CONSTRAINT "tax_lot_pkey";--> statement-breakpoint
ALTER TABLE "tax_lot" ADD PRIMARY KEY ("bbl");--> statement-breakpoint
ALTER TABLE "tax_lot" ALTER COLUMN "bbl" SET DATA TYPE char(10);--> statement-breakpoint
ALTER TABLE "project_site_tax_lot" ADD COLUMN "tax_lot_bbl" char(10) NOT NULL;--> statement-breakpoint
ALTER TABLE "tax_lot_long_island" ADD COLUMN "tax_lot_bbl" char(10) NOT NULL;--> statement-breakpoint
ALTER TABLE "tax_lot_wgs84" ADD COLUMN "tax_lot_bbl" char(10) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_site_tax_lot" ADD CONSTRAINT "project_site_tax_lot_tax_lot_bbl_tax_lot_bbl_fk" FOREIGN KEY ("tax_lot_bbl") REFERENCES "tax_lot"("bbl") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tax_lot_long_island" ADD CONSTRAINT "tax_lot_long_island_tax_lot_bbl_tax_lot_bbl_fk" FOREIGN KEY ("tax_lot_bbl") REFERENCES "tax_lot"("bbl") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tax_lot_wgs84" ADD CONSTRAINT "tax_lot_wgs84_tax_lot_bbl_tax_lot_bbl_fk" FOREIGN KEY ("tax_lot_bbl") REFERENCES "tax_lot"("bbl") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "project_site_tax_lot" DROP COLUMN IF EXISTS "tax_lot_id";--> statement-breakpoint
ALTER TABLE "tax_lot_long_island" DROP COLUMN IF EXISTS "tax_lot_id";--> statement-breakpoint
ALTER TABLE "tax_lot_wgs84" DROP COLUMN IF EXISTS "tax_lot_id";--> statement-breakpoint
ALTER TABLE "tax_lot" DROP COLUMN IF EXISTS "id";
