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

quizRouter.get('/:id', async (req, res) => {
    let quiz;
    try {
        quiz = await Quiz.findById(req.params.id);
        if(quiz === null) {
            res.json({err: "Quiz not found"})
        } else {
            res.json(quiz)
        }
    } catch(err) {
        res.json({err: err})
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