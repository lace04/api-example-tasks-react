import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tasksdb',
  port: 3306,
});
