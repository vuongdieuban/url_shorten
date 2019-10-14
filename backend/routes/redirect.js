const { Url } = require("../models/url");
const express = require("express");
const router = express.Router();

router.get("/:urlCode", async (req, res) => {
  const url = await Url.findOne({ urlCode: req.params.urlCode });
  if (!url) {
    return res.status(404).json("Cannot find url with this urlCode");
  }
  return res.redirect(url.longUrl);
});

module.exports = router;
