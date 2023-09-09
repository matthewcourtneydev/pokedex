const express = require("express");
const completedQuizRouter = express.Router();
const CompletedQuiz = require("../models/completed-quiz");

completedQuizRouter.get("/", async (req, res) => {
    try {
        const completedQuizes = await CompletedQuiz.find();
        res.json(completedQuizes)
    } catch (err) {
        res.json({error: err.message})
    }
})

module.exports = completedQuizRouter;