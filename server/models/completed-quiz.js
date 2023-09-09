const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const completedQuiz = new mongoose.Schema({
    score: {type: Number},
    badge: {type: String},
    world: {type: String}
})

module.exports = mongoose.model("CompletedQuiz", completedQuiz)