const config = require("config");
const validUrl = require("valid-url");
const shortid = require("shortid");
const { Url } = require("../models/url");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).json("Not a valid baseUrl");
  }

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json("Not a valid longUrl");
  }

  let url = await Url.findOne({ longUrl });
  if (url) {
    res.json(url);
  } else {
    const urlCode = shortid.generate();
    const shortUrl = baseUrl + "/" + urlCode;
    url = new Url({
      longUrl,
      shortUrl,
      urlCode,
      date: new Date()
    });
    await url.save();
    res.json(url);
  }
});

module.exports = router;
