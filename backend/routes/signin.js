const config = require("config");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const express = require("express");
const router = express.Router();

// This route is used for signin. Should receive a google token from frontend, this route need to verify it again with Google.
// get the user object from google, query database for this user email. If exist then return user, else make a new record for this user.

router.post("/", async (req, res) => {
  const ClientID = config.get("ClientID");
  const ClientSecret = config.get("ClientSecret");

  const { accessToken, refreshToken } = req.body;
  // Post the new urlId into this user urlId array
  const oauth2Client = new OAuth2(
    ClientID,
    ClientSecret,
    "http://localhost:5000"
  );

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken
  });

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2"
  });

  try {
    // const { data } = await oauth2.userinfo.get();
    const { data } = await oauth2.userinfo.get();
    res.json(data);
  } catch (err) {
    res.status(400).send("Wrong token info. Token might expired");
    console.log(err);
  }
});

module.exports = router;
