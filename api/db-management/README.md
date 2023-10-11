## Issues
- Custom types have quotes around them
- Adding constraints done out of necessary order
- Trying to automatically cast from text to integer

## Down
- Would have been handy after already applying a migration to the test database and realizing I actually wanted to make a field not null. 
    - It's technically possible to make another migrate forward to add the requirement. But, it would have been cleaner to undo the migration
    in the database and then remake the migration script with the desired field.:w

## Making files available in docker
```
sudo cp ../purple-hawk-data/borough.csv api/db_volume/
sudo cp ../purple-hawk-data/pluto_23v2_essentials_strict_short.csv api/db_volume/
sudo cp ../purple-hawk-data/pluto_23v2_2263_short.csv api/db_volume/
sudo cp ../purple-hawk-data/pluto_23v2_4326_short.csv api/db_volume/
```