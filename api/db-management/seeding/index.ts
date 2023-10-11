import { drizzle } from 'drizzle-orm/node-postgres';
import { pgClient } from '../pg-client';
import { user } from '../../src/schema/user';
import { exit } from 'process';
import { sql } from 'drizzle-orm';
import { taxLot } from '../../src/schema/tax-lot';

console.info('hello, world');
async () => {
  console.info('start seeding');
  await pgClient.connect();
  const db = drizzle(pgClient);
  await db.insert(user).values({
    name: sql`UPPER('third user')`,
  });
  await pgClient.end();
  console.info('stop seeding');
  exit();
};
// ();

(async () => {
  console.info('start seeding tax lot');
  await pgClient.connect();
  const db = drizzle(pgClient);
  await db.insert(taxLot).values({
    id: '3123456789',
  });
  await pgClient.end();
  console.info('stop seeding tax lot');
})();
