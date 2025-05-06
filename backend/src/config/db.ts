import { createPool, Pool } from 'mysql2/promise';

let pool: Pool;
export const db = (): Pool =>
  pool ??
  (pool = createPool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'app_user',
    password: process.env.DB_PASSWORD || 'app_password',
    database: process.env.DB_NAME || 'app_db',
    waitForConnections: true,
    connectionLimit: 10,
  }));