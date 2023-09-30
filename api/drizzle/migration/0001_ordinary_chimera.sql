CREATE TABLE IF NOT EXISTS "tax_lot" (
	"id" char(10) PRIMARY KEY NOT NULL,
	"geom" geometry(polygon,4326)
);
