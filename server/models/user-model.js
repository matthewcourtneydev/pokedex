const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
    username: {type: String, unique: true },
    email: {type: String, unique: true },
    completedQuizes: [{type: String}],
    password: {type: String},
    experience: {type: Number , default: 0},
    favorites: [{type: String}],
    badges: [{type: String}],
    starter: {type: String}
})

module.exports = mongoose.model("User", userSchema);