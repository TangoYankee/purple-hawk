import { registerAs } from '@nestjs/config';

export const DbConfig = registerAs('db', () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
}));
