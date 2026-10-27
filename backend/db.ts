import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://babakiz_user:babakiz_secret_password@localhost:5432/babakiz_db';

const client = postgres(connectionString, { max: 10 });
export const db = drizzle(client, { schema });