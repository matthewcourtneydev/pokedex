const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new mongoose.Schema({
    questions: [{
        question: {type: String},
        img: {type: String},
        answers: [{
            name: {type: String},
            value: {type: String},
            isCorrect: {type: Boolean}
        }]
    }],
    title: {type: String},
    world: {type: String},
    badge: {type: String},
    leader: {type: String},
    pointsPerQuestion: {type: Number}
})

module.exports = mongoose.model("Quiz", quizSchema);
