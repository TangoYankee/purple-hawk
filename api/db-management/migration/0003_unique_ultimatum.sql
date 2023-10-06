ALTER TABLE "tax_lot" RENAME COLUMN "geom" TO "wgs84";--> statement-breakpoint
ALTER TABLE "tax_lot" ALTER COLUMN "wgs84" SET DATA TYPE geography(polygon, 4326);--> statement-breakpoint
ALTER TABLE "tax_lot" ADD COLUMN "long_island_ft" geometry(polygon,2263);