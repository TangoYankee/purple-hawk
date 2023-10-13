-- Borough
BEGIN;
COPY borough ("id", "name", "abbr")
    FROM 'borough.csv'
    DELIMITER ','
    CSV HEADER;
ROLLBACK;
COMMIT;

BEGIN;
-- Tax lot field data
COPY tax_lot ("bbl", "borough_code", "block", "lot")
    FROM 'pluto_23v2_essentials_v1.csv'
    DELIMITER ','
    CSV HEADER;

-- Tax lot wgs84 spatial data
COPY tax_lot_wgs84 ("tax_lot_bbl", "geog")
    FROM 'pluto_23v2_wgs84_v1.csv'
    DELIMITER ','
    CSV HEADER;

-- Tax lot long island spatial data
COPY tax_lot_long_island ("tax_lot_bbl", "geom")
    FROM 'pluto_23v2_long_island_v1.csv'
    DELIMITER ','
    CSV HEADER;
	
ROLLBACK;
COMMIT;

BEGIN;
-- Building fields
COPY building ("id_number", "construction_year", "roof_height", "ground_elevation", "feat_code")
	FROM 'building_essentials_v1.csv'
	DELIMITER ','
	CSV HEADER;

-- Building state plane
COPY building_long_island("bin", "geom")
	FROM 'building_long_island_v1.csv'
	DELIMITER ','
	CSV HEADER;

-- Building wgs84
COPY building_wgs84("bin", "geog")
	FROM 'building_wgs84_v1.csv'
	DELIMITER ','
	CSV HEADER;

ROLLBACK;
COMMIT;

BEGIN;
-- Zoning District
COPY zoning_district("id", "code")
    FROM 'zoning_district_fields_v1.csv'
    DELIMITER ','
    CSV HEADER;

COPY zoning_district_long_island("id", "geom")
	FROM 'zoning_district_long_island_v1.csv'
	DELIMITER ','
	CSV HEADER;
	
COPY zoning_district_wgs84("id", "geog")
	FROM 'zoning_district_wgs84_v1.csv'
	DELIMITER ','
	CSV HEADER;

ROLLBACK;
COMMIT;
