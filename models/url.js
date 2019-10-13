const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  urlCode: String,
  originUrl: String,
  shortUrl: String,
  date: { type: String, default: Date.now }
});

const Url = mongoose.model("Url", urlSchema);

module.exports.Url = Url;
