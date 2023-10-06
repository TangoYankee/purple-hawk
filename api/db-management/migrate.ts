import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { exit } from 'process';

(async () => {
  console.info('start migrate');
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  await client.connect();
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: './db-management/migration' });
  console.info('end migrate');
  exit();
})();
