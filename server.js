// src/server.js
import express from 'express';
import pool from './src/db.js';

const app = express();
const PORT = 3000;
app.use(express.json());


app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
