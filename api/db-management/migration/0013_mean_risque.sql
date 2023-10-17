CREATE TABLE IF NOT EXISTS "project_area_tax_lot" (
	"project_area_id" integer NOT NULL,
	"tax_lot_bbl" char(10) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_area_tax_lot" ADD CONSTRAINT "project_area_tax_lot_project_area_id_project_area_id_fk" FOREIGN KEY ("project_area_id") REFERENCES "project"("area_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_area_tax_lot" ADD CONSTRAINT "project_area_tax_lot_tax_lot_bbl_tax_lot_bbl_fk" FOREIGN KEY ("tax_lot_bbl") REFERENCES "tax_lot"("bbl") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
