const { Url } = require("../models/url");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Hello world");
});

module.exports = router;
