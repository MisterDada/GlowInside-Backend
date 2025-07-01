// src/server.js
import express from "express";
import mongoose from "mongoose";
import authRoutes from './src/Routes/authRoutes.js'
import notesRoutes from './src/Routes/notesRoutes.js'
import dotenv from "dotenv"
import connectDB from "./config/db.js";

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);


app.get("/", (req, res) => {
  res.send("Hello");
});

app.get('/api/auth/login', (req, res) => {
  res.json({ msg: "Login route works!" });
});

app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

connectDB();
