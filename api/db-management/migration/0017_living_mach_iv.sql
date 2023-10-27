DO $$ BEGIN
 CREATE TYPE "service_area" AS ENUM('Local', 'Regional');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "facility" (
	"uid" text PRIMARY KEY NOT NULL,
	"name" text,
	"type" text,
	"bin" char(7),
	"bbl" char(10),
	"address_building_code" text,
	"address_street_name" text,
	"capacity" numeric,
	"capacity_type" text,
	"facility_service_area" "service_area" NOT NULL,
	"operating_entity" text,
	"oversight_agency" text,
	"wgs84" geography(point, 4326),
	"lift" geometry(point,2263)
);
