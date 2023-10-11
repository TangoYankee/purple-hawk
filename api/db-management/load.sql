-- Borough
BEGIN;
COPY borough ("id", "name", "abbr")
    FROM 'borough.csv'
    DELIMITER ','
    CSV HEADER;

-- Tax lot field data
COPY tax_lot ("id", "bbl", "boroughCode", "block", "lot")
    FROM 'pluto_23v2_essentials_strict_short.csv'
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
