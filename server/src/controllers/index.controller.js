import { pool } from '../db.js';

export const indexWelcome = (req, res) => {
  res.json({
    message: 'Welcome to index API',
  });
};

export const testConnectdb = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT NOW()');
    res.json({
      message: 'Connection to database successfully',
      result: result[0],
    });
  } catch (error) {
    console.log(error);
  }
};
