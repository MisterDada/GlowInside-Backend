import express from 'express'
import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;
        const existingUser = await userModel.findOne({username})

        if(existingUser){
           return res.status(400).json({message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({username, password: hashedPassword});
        await user.save();
    } catch (error) {
        res.status().json({error: 'Error creating user'})
    }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password); // ✅ await it
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // ✅ use user._id

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email || '', // fallback if email is undefined
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' }); // ✅ respond with error
  }
});


export default router