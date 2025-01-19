const express = require('express');
const router = express.Router();

// Example quiz questions
const questions = [
  {
    question: "What's 2 + 2?",
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
  },
  {
    question: "What's the capital of France?",
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  },
];

// Route to get quiz questions
router.get('/', (req, res) => {
  res.json(questions);
});

// Route to submit quiz answers and calculate score
router.post('/submit', (req, res) => {
  const { answers } = req.body;
  let score = 0;

  questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      score++;
    }
  });

  res.json({ score });
});

module.exports = router;
