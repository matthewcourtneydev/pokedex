const express = require("express");
const userRouter = express.Router();
const User = require("../models/user-model");

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ error: err });
  }
});

userRouter.post("/", async (req, res) => {
    console.log(req.body)

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        starter: req.body.starter
    });

    try {
        const savedUser = await newUser.save();
        res.json(savedUser)
    } catch (err) {
        res.json({error: err.message})
    }
});

userRouter.patch("/:id", getUser, async (req, res) => {
    console.log(res.user)
    if (req.body.newQuiz) {
        res.user.completedQuizes = [...res.user.completedQuizes, req.body.newQuiz._id],
        res.user.badges = [...res.user.badges, req.body.newQuiz.badge],
        res.user.experience = res.user.experience += req.body.newQuiz.score
    };

    if (req.body.favorites) {
        res.user.favorites = [...res.user.favorites, req.body.favorites.favorite]
    };

    try { 
        const updatedUser = await res.user.save();
        res.json(updatedUser)
    } catch(err) {
        res.json({error: err.message})
    }
});


userRouter.delete("/:id", getUser, async (req, res) => {
    console.log(req.user)
    try{
        await res.user.deleteOne();
        res.json({message: "USER DELETED"})
    } catch (err) {
        res.json({error: err.message})
    }
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(400).json({ error: "user not found"})
        };
    } catch(err) {
        res.json({ error: err })
    }

    res.user = user;
    next();
} 

module.exports = userRouter;
