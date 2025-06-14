import pool from '../db.js'




app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/users/:id', async (req, res) => {
  const {id} = req.params

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE id = ?', [id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(rows[0])
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }

})