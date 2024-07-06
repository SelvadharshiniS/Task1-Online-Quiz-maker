const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// GET all quizzes
router.get('/show', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
        console.log(quizzes)
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } 
});
 
// GET a specific quiz by ID
router.get('/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const quiz = await Quiz.findOne({title:title});
        console.log(quiz)
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
 
// POST a new quiz
router.post('/', async (req, res) => {
    const { title, questions } = req.body;
    const newQuiz = new Quiz({ title, questions });
    try {
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(400).json({ message: 'Bad Request' });
    }
});

// PUT (update) an existing quiz by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, questions } = req.body;
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(id, { title, questions }, { new: true });
        if (!updatedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(updatedQuiz);
    } catch (error) {
        console.error('Error updating quiz:', error);
        res.status(400).json({ message: 'Bad Request' });
    }
});

// DELETE a quiz by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(id);
        if (!deletedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}); 

module.exports = router;