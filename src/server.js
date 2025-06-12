// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import pool from './db.js';

// dotenv.config();


// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Sample route
// app.get("/", (req, res) => {
//   res.send("Chat API is running 🚀");
// });

// app.get("/test-db", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT NOW()");
//     res.send(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Database error");
//   }
// });

// app.listen(PORT,'0.0.0.0', () => {
//   console.log(`Server is running on port ${PORT}`);
// }).on('error', (err) => {
//   console.error('Failed to start server:', err);
// });

// index.js
import db from './db'

db.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error('Database query failed:', err);
    return;
  }

  console.log('Users:', results);
});
