const { Url } = require("../models/url");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

// THere should be a auth middleware that check for google auth token , if it is valid then pass the user info to this route, else reject in the middleware

router.get("/", async (req, res) => {
  // Return this user info, including all the urls
  try {
    // THe middleware pass the user object into this route. Extract and find the user based on email.
    // If user not exist then return 400 (user not exist)
    // Else return user object, which include all the urls in urlId array. Need to populate the urlId with url object before return
    // Search for mongoose populate
    res.send("Get User info");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Something is wrong on the server");
  }
});

router.post("/", async (req, res) => {
  // Post the new urlId into this user urlId array
  try {
    // THe middleware pass the user object into this route. Extract and find the user based on email.
    // If user not exist then return 400 (user not exist)
    // If urlId not exist  return 400 (urlId not exist)
    // Else, push the new urlId into the user urlId array then save and return.
    res.send("post new url to user");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Something is wrong on the server");
  }
});

module.exports = router;
