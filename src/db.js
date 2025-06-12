// db.js
import mysql from 'mysql2'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'obafemi',       // e.g., 'root' or 'myuser'
  password: 'Obafemzy1!',
  database: 'chatapp',             // the database you created
});

module.exports = pool;
