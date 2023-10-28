const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Quiz = require("./quiz-model")

const completedQuiz = new mongoose.Schema({
    score: {type: Number},
    badge: {type: String},
    world: {type: String},
    quizRef: { type: Schema.Types.ObjectId, ref: 'Quiz' }
})

module.exports = mongoose.model("CompletedQuiz", completedQuiz)