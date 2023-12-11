## Running the migrations in the api container
```
docker compose exec -it api npm run migrate
```

## Making files available in docker
```
docker compose cp [DATA_FILE_PATH]/. geodb:var/lib/postgresql/data
```

## Loading the csv files into the database tables
Run the sql loading commands from the ['load.sql'](load.sql) file. Omit the "Rollback" commands; they are intended as a safety stop-gap that should be skipped unless needed.
