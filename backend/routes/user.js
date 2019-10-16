const express = require("express");
const router = express.Router();
const { Url } = require("../models/url");
const { User, validate } = require("../models/user");
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
  const { urls } = req.body; // urls contains url's _id generated from posting a long url to /url

  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // Check to verify all the id in urls exists
  try {
    await Url.find({ _id: { $exists: true, $in: urls } });
  } catch (err) {
    return res.status(400).json(err.message);
  }

  const user = await User.findOneAndUpdate(
    { googleId },
    { $addToSet: { urls } },
    { new: true }
  ).populate("urls");

  // User not found only happen if database wipe the user. User should alredy exist if x-auth-token pass b/c x-auth-token is signed when user is signed in.
  if (!user) return res.status(500).send("User not exist, try signin again");
  res.json(user);
});

module.exports = router;
