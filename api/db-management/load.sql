-- Borough
BEGIN;
COPY borough ("id", "name", "abbr")
    FROM 'borough.csv'
    DELIMITER ','
    CSV HEADER;

-- Tax lot field data
COPY tax_lot ("id", "bbl", "borough_code", "block", "lot")
    FROM 'pluto_23v2_essentials_short_v2.csv'
    DELIMITER ','
    CSV HEADER;

-- Tax lot wgs84 spatial data
COPY tax_lot_wgs84 ("tax_lot_id", "geog")
    FROM 'pluto_23v2_4326_short.csv'
    DELIMITER ','
    CSV HEADER;

-- Tax lot long island spatial data
COPY tax_lot_long_island ("tax_lot_id", "geom")
    FROM 'pluto_23v2_2263_short.csv'
    DELIMITER ','
    CSV HEADER;
	
ROLLBACK;
COMMIT;

BEGIN;

COPY building ("id_number", "construction_year", "roof_height", "ground_elevation", "feat_code")
	FROM 'building_essentials_short_v1.csv'
	DELIMITER ','
	CSV HEADER;

COPY building_long_island("bin", "geom")
	FROM 'building_long_island_short_v1.csv'
	DELIMITER ','
	CSV HEADER;

COPY building_wgs84("bin", "geog")
	FROM 'building_wgs84_short_v1.csv'
	DELIMITER ','
	CSV HEADER;

ROLLBACK;
COMMIT;
