const express = require("express");
const router = express.Router();

// This route is used for signin. Should receive a google token from frontend, this route need to verify it again with Google.
// get the user object from google, query database for this user email. If exist then return user, else make a new record for this user.

router.post("/", async (req, res) => {
  // Post the new urlId into this user urlId array
  try {
    res.send("signin");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Something is wrong on the server");
  }
});

module.exports = router;
