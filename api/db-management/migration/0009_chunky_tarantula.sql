CREATE TABLE IF NOT EXISTS "neighborhood" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"wgs84" geography(point, 4326),
	"lift" geometry(point,2263)
);
