const express = require("express");
const router = express.Router();
const { Url } = require("../models/url");
const { User } = require("../models/user");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const { googleId } = req.user;
  const user = await User.findOne({ googleId }).populate("urls");
  // User not found only happen if database wipe the user. User should alredy exist if x-auth-token pass b/c x-auth-token is signed when user is signed in.
  if (!user) return res.status(500).send("User not exist, try signin again");
  res.json(user);
});

router.post("/", auth, async (req, res) => {
  const { googleId } = req.user;
  const { urlId } = req.body; // urlId generated from posting a long url to /url

  const url = await Url.findOne({ _id: urlId });
  if (!url) return res.status(400).json("This url does not exist");

  const user = await User.findOneAndUpdate(
    { googleId },
    { $addToSet: { urls: urlId } },
    { new: true }
  ).populate("urls");

  // User not found only happen if database wipe the user. User should alredy exist if x-auth-token pass b/c x-auth-token is signed when user is signed in.
  if (!user) return res.status(500).send("User not exist, try signin again");
  res.json(user);
});

module.exports = router;
