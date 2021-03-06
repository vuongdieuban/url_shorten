const config = require("config");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

// This route is used for signin. Should receive a google token from frontend, this route need to verify it again with Google.
// get the user object from google, query database for this user email. If exist then return user, else make a new record for this user.

router.post("/", async (req, res) => {
  const ClientId = config.get("ClientId");
  const ClientSecret = config.get("ClientSecret");

  const { accessToken } = req.body;
  const oauth2Client = new OAuth2(ClientId, ClientSecret);

  oauth2Client.setCredentials({ access_token: accessToken });

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2"
  });

  try {
    const { data } = await oauth2.userinfo.get();
    // CHeck if user exist based on googleId, if user not exist in database, create user. Return a signed JWT.
    // If user already exist, load up existed user. Return a signed JWT.
    const { id: googleId, email, name } = data;
    let user = await User.findOne({ googleId }).populate("urls");
    if (!user) {
      user = new User({
        googleId,
        name,
        email,
        urls: []
      });
      await user.save();
    }
    const jwtToken = user.generateAuthToken();
    res
      .header("x-auth-token", jwtToken)
      .header("access-control-expose-headers", "x-auth-token")
      .json(jwtToken);
  } catch (err) {
    res.status(401).send("Wrong authentication credential");
    console.log(err);
  }
});

module.exports = router;
