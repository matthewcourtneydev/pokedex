const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
    username: {type: String, unique: true },
    email: {type: String, unique: true },
    completedQuizes: [{type: String}],
    password: {type: String},
    experience: {type: Number , default: 0},
    favorites: {type: Array},
    badges: [{type: String}],
    starter: {type: String},
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model("User", userSchema);