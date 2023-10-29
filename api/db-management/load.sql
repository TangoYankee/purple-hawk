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
DELETE FROM building;
COPY building (
	"id_number",
	"construction_year",
	"roof_height",
	"ground_elevation",
	"feat_code",
	"lift",
	"wgs84")
	FROM 'building_v2.csv'
	DELIMITER ','
	CSV HEADER;

COMMIT;

BEGIN;
DELETE FROM zoning_district;
COPY zoning_district(
	"id",
	"code",
	"lift",
	"wgs84"
	)
    FROM 'zoning_district_v1.csv'
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


BEGIN;
COPY facility(
		"uid",
		"name",
		"bin",
		"bbl",
		"address_building_code",
		"address_street_name",
		"type",
		"facility_service_area",
		"operating_entity",
		"oversight_agency",
		"capacity",
		"capacity_type",
		"lift",
		"wgs84"
	)
FROM 'facility_v1.csv'
    DELIMITER ','
    CSV HEADER;
	
SAVEPOINT copied_facility;

UPDATE facility
	SET bin = NULL
	WHERE bin = '0';
	
SAVEPOINT nulled_bin;

UPDATE facility
	SET bbl = NULL
	WHERE bbl = '0';

SAVEPOINT nulled_bbl;

UPDATE facility
	SET capacity = NULL
	WHERE capacity = '0';

SAVEPOINT nulled_capacity;

DELETE FROM facility WHERE wgs84 IS NULL;

ROLLBACK;
COMMIT;
