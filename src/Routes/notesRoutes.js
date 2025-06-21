import express from 'express'
import notesModel from '../models/notes.model.js'

const router = express.Router()

router.post('/create', async (req, res) => {
    try {
        const { title, content, category} = req.body;
        const newNote = new notesModel({
            title,
            content,
            category,
        });
        await newNote.save();
        res.status(201).json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
        res.status(500).json({ error: "Error creating note", error});
    }
})
router.get('/', async (req, res) => {
    try {
        const notes = await notesModel.find().populate('user', 'username email');
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching notes" });
    }
})
export default router