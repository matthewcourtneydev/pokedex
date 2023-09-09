const express = require("express");
const quizRouter = express.Router();
const Quiz = require("../models/quiz-model");

quizRouter.get("/", async (req, res) => {
    try {
        const quizes = await Quiz.find();
        res.json(quizes)
    } catch (err) {
        res.json({error: err.message})
    }
})


module.exports = quizRouter;