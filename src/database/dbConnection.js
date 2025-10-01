import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
console.log('[DB PASSWORDs]', process.env.DB_PASSWORD);

let poolConfig;

if (process.env.DATABASE_URL) {
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // required for Render
    },
  };
} else {
  poolConfig = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  };
}

const pool = new Pool(poolConfig);

pool.on('connect', () => {
  console.log('Conection pool established with db');
});

export default pool;
