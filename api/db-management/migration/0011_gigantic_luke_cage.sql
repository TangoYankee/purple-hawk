CREATE TABLE IF NOT EXISTS "fresh" (
	"id" serial PRIMARY KEY NOT NULL,
	"class" text,
	"wgs84" geography(multiPolygon, 4326),
	"lift" geometry(multiPolygon,2263)
);
