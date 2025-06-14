// src/server.js
import express from "express";
import mongoose from "mongoose";
import pool from "./src/db.js";

const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database error");
  }
});

mongoose
  .connect(
    "mongodb+srv://obafemi:obafemi@backend.k4juqxb.mongodb.net/?retryWrites=true&w=majority&appName=Backend"
  )
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error + "Could not connect");
  });
