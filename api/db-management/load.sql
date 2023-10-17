-- Borough
BEGIN;
COPY borough ("id", "name", "abbr")
    FROM 'borough_v1.csv'
    DELIMITER ','
    CSV HEADER;
	
ROLLBACK;
COMMIT;

-- Land use
BEGIN;
COPY land_use ("code", "category")
	FROM 'land_use_v1.csv'
	DELIMITER ','
	CSV HEADER;
	
ROLLBACK;
COMMIT;

-- Lot type
BEGIN;
COPY lot_type ("code", "label", "description")
	FROM 'lot_type_v1.csv'
	DELIMITER ','
	CSV HEADER;
	
ROLLBACK;
COMMIT;

BEGIN;
-- Tax lot field data
COPY tax_lot (
		"bbl",
		"borough_code",
		"block",
		"lot",
		"address",
		"building_class",
		"land_use_code",
		"commercial_area",
		"residential_area",
		"office_area",
		"retail_area",
		"garage_area",
		"storage_area",
		"factory_area",
		"other_area",
		"floors",
		"residential_units",
		"total_units",
		"lot_type",
		"landmark",
		"built_far",
		"residential_far",
		"commercial_far",
		"facility_far",
		"wgs84",
		"lift"
		)
    FROM 'tax_lot_v3.csv'
    DELIMITER ','
    CSV HEADER
	NULL AS 'nan';

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

-- neighborhood
BEGIN;
COPY neighborhood ("name", "wgs84", "lift")
	FROM 'neighborhood_v1.csv'
	DELIMITER ','
	CSV HEADER;
	
ROLLBACK;
COMMIT;

-- community district
BEGIN;
COPY community_district ("borough", "code", "wgs84", "lift")
	FROM 'cd_v1.csv'
	DELIMITER ','
	CSV HEADER;

ROLLBACK;
COMMIT;

-- fresh zones
BEGIN;
COPY fresh ("class", "wgs84", "lift")
	FROM 'fresh_v1.csv'
	DELIMITER ','
	CSV HEADER;
	
ROLLBACK;
COMMIT;
