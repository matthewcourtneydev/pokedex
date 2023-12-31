const express = require("express");
const userRouter = express.Router();
const User = require("../models/user-model");

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("friends").exec();
    res.json(users);
  } catch (err) {
    res.json({ error: err });
  }
});

userRouter.get("/:id", getUser, async (req, res) => {
  res.json(res.user);
});

userRouter.post("/", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    starter: req.body.starter,
  });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ error: err.message });
  }
});

userRouter.patch("/:id", getUser, async (req, res) => {
  if (req.body.newQuiz) {
    (res.user.completedQuizes = [
      ...res.user.completedQuizes,
      req.body.newQuiz.quizId,
    ]),
      (res.user.badges = [...res.user.badges, req.body.newQuiz.badge]),
      (res.user.experience = res.user.experience += req.body.newQuiz.score);
  }

  if (req.body.favorites) {
    res.user.favorites = req.body.favorites;
  }

  if (req.body.friends) {
    res.user.friends = req.body.friends;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.json({ error: err.message });
  }
});

userRouter.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "USER DELETED" });
  } catch (err) {
    res.json({ error: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id).populate("friends").exec();
    if (user == null) {
      return res.status(400).json({ error: "user not found" });
    }
  } catch (err) {
    res.json({ error: err });
  }

  res.user = user;
  next();
}

module.exports = userRouter;
