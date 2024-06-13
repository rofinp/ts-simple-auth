import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'simple_auth',
  password: 'EINCARNATIOn1618',
  port: 5432,
});

export default pool;