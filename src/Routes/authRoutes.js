import express from "express";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await userModel.findOne({ username });
    const existingEmail = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (existingEmail) {
      return res.status(400).json({ message: "email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ username, password: hashedPassword, email });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email || "", // fallback if email is undefined
      },
    });
  } catch (error) {
    res.status().json({ error: "Error creating user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email || "", // fallback if email is undefined
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during login" }); // ✅ respond with error
  }
});

export default router;
