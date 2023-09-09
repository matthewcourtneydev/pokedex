const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user-routes");
const quizRouter = require("./routes/quiz-routes");
const completedQuizRouter = require("./routes/completed-quiz-route");
const port = 3002;
const app = express();


mongoose.connect("mongodb://localhost/pokedex", { useNewUrlParser: true })
const db = mongoose.connection;

db.on("error", (err) => {
    console.log(err)
})
db.once("open", () => {
    console.log("Mogoose db is open")
})

app.use(express.json())
app.use("/users", userRouter);
app.use("/quizes", quizRouter);
app.use("/completedQuizes", completedQuizRouter)

app.listen(port, () => {
    console.log("App is running on port 3002")
})