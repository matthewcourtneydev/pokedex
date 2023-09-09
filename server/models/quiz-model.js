const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new mongoose.Schema({
    questions: [{type: String}],
    title: {type: String},
    world: {type: String},
    badge: {type: String},
    pointsPerQuestion: {type: Number}
})

module.exports = mongoose.model("Quiz", quizSchema);
