const express = require("express");
const url = require("../routes/url");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/url", url);
};
