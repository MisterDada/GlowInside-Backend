// src/server.js
import express from "express";
import mongoose from "mongoose";
import authRoutes from './src/Routes/authRoutes.js'
import messageRoutes from './src/Routes/messageRoutes.js'

export const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);


app.get("/", (req, res) => {
  res.send("Hello");
});

app.get('/api/auth/login', (req, res) => {
  res.json({ msg: "Login route works!" });
});

app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

mongoose
  .connect(
    "mongodb+srv://obafemi:obafemi@backend.k4juqxb.mongodb.net/?retryWrites=true&w=majority&appName=Backend"
  )
  .then(() => {
    console.log("connected to database");
    
  })
  .catch((error) => {
    console.error(error + "Could not connect");
  });
