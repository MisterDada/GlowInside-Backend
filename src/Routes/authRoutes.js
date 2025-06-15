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
        const {username, password} = req.body;
        const user = await userModel.findOne({username});

        if (!user){
            return res.status(400).json({message: 'user does not exist / invalid credentials'})
        }
        const passwordMatch = bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return res.status(400).json({message: 'user does not exist / invalid credentials'})
        }

        const token = jwt.sign({ id: userModel._id}, process.env.JWT_SECRET)

        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        
    }
})

export default router