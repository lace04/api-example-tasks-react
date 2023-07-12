import { pool } from '../db.js';

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM tasks`);
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};

export const getTask = async (req, res) => {
  try {
    // req.params.id; id de la tarea que se obtiene de la url
    const [result] = await pool.query(`SELECT * FROM tasks WHERE id = ?`, [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: 'Task not found' });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, done } = req.body;
    const [result] = await pool.query(
      `INSERT INTO tasks (title, description, done) VALUES (?, ?, ?)`,
      [title, description, done]
    );

    if (result.affectedRows === 0)
      return res.status(400).json({
        message: 'Bad request',
      });

    res.json({
      id: result.insertId,
      title,
      description,
      done,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query(`UPDATE tasks SET ? WHERE id = ?`, [
      req.body,
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Task not found' });

    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const [result] = await pool.query(`DELETE FROM tasks WHERE id = ?`, [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: 'Task not found' });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};
