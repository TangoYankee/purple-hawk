CREATE TABLE IF NOT EXISTS "project_site_tax_lot" (
	"project_site_id" integer NOT NULL,
	"tax_lot_id" char(10) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "site_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_site_id_unique" UNIQUE("site_id");
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_site_tax_lot" ADD CONSTRAINT "project_site_tax_lot_project_site_id_project_site_id_fk" FOREIGN KEY ("project_site_id") REFERENCES "project"("site_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_site_tax_lot" ADD CONSTRAINT "project_site_tax_lot_tax_lot_id_tax_lot_id_fk" FOREIGN KEY ("tax_lot_id") REFERENCES "tax_lot"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
