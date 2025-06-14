// src/server.js
import express from "express";
import mongoose from "mongoose";
import productRoutes from './src/Routes/products.js'

export const app = express();
const PORT = 3000;

//middleware
app.use(express.json());
app.use('/api/products', productRoutes); // base path


app.get("/", (req, res) => {
  res.send("Hello");
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
