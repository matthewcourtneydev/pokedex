const express = require("express");
const completedQuizRouter = express.Router();
const CompletedQuiz = require("../models/completed-quiz");

completedQuizRouter.get("/", async (req, res) => {
  try {
    const completedQuizes = await CompletedQuiz.find();
    res.json(completedQuizes);
  } catch (err) {
    res.json({ error: err.message });
  }
});

completedQuizRouter.post("/", async (req, res) => {
  const completedQuiz = new CompletedQuiz({
    score: req.body.score,
    badge: req.body.badge,
    world: req.body.world,
    quizRef: req.body.quizRef,
  });

  try {
    const submittedQuiz = await completedQuiz.save();
    res.send(submittedQuiz);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = completedQuizRouter;
