import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Chat API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});