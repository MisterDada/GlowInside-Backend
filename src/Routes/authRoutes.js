import express from "express";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register-step1", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ email, password: hashedPassword });
    await user.save();

    // Optionally, return the user ID for the next step
    res.status(201).json({
      message: "Step 1 complete. Proceed to set username.",
      userId: user._id
    });
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Error in step 1 registration" });
    res.status(404).json({error})
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if(!email || !password){
      return res.status(400).json({ message: "Email and password are required" });
    }

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
        username: user.username || "", // fallback if email is undefined,
        email: user.email 
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Server error during login" }); 
  }
});

router.post("/register-step2", async (req, res) => {
  try {
    const { userId, username } = req.body;

    // if (!userId || !username) {
    //   return res.status(400).json({ message: "User ID and username are required" });
    // }
    if(!userId){
      return res.status(400).json({message: "no userId"})
    }
    // Update the user
    const user = await userModel.findByIdAndUpdate(
      userId,
      { username },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      message: "Registration complete",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    console.error("Register step 2 error:", error);
    res.status(400).json({ error: "Error in step 2 registration" });
  }
});

export default router;
