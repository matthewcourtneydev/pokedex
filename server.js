require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user-model")
const userRouter = require("./routes/user-routes");
const quizRouter = require("./routes/quiz-routes");
const port = 5000;
const app = express();


mongoose.connect("mongodb://localhost/pokedex", { useNewUrlParser: true })
const db = mongoose.connection;

db.on("error", (err) => {
    console.log(err)
})
db.once("open", () => {
    console.log("Mogoose db is open")
})

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
app.use("/users", userRouter);
app.use("/quizes", quizRouter);

app.post("/login", async (req, res) => {
    const userEmail = req.body.email;
    const user = { email: req.body.email, password: req.body.password }

    try {
        const calledUser = await User.findOne({email: userEmail}).populate('friends').exec();
        if (calledUser) {
            if (calledUser.password === user.password) {
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                console.log({ accessToken: accessToken, user: calledUser})
                res.send({ accessToken: accessToken, user: calledUser})
            } else {
                res.json({error: "pasword doesnt match"})
            }
        } else {
            res.json({error: "USER NOT FOUND"})
        }
    } catch (err) {
        res.json({ error: err.message })
    }
})

app.listen(port, () => {
    console.log("App is running on port", port)
})