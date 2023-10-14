CREATE TABLE IF NOT EXISTS "community_district" (
	"id" serial PRIMARY KEY NOT NULL,
	"borough" char(1) NOT NULL,
	"code" char(2) NOT NULL,
	"wgs84" geography(multiPolygon, 4326),
	"lift" geometry(multiPolygon,2263)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "community_district" ADD CONSTRAINT "community_district_borough_borough_id_fk" FOREIGN KEY ("borough") REFERENCES "borough"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
