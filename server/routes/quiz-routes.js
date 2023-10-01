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

quizRouter.post("/", async (req, res) => {
    const newQuiz = new Quiz({
        questions: req.body.questions,
        title: req.body.title,
        world: req.body.world,
        badge: req.body.badge,
        leader: req.body.leader,
        pointPerQuestion: req.body.pointPerQuestion
    });

    try {
        const savedQuiz = await newQuiz.save();
        res.json(savedQuiz);
    } catch (err) {
        res.json({error: err.message})
    }
})

quizRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
       await Quiz.deleteOne({_id: id});
        res.json({message: "deleted quizes"});
    } catch (err) {
        res.json({error: err.message})
    }
})

module.exports = quizRouter;