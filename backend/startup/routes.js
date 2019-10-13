const express = require("express");
const url = require("../routes/url");
const redirect = require("../routes/redirect");

module.exports = function(app) {
  app.use(express.json());
  app.use("/", redirect);
  app.use("/api/url", url);
};
