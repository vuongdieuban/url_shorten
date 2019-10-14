const express = require("express");
const url = require("../routes/url");
const user = require("../routes/user");
const signin = require("../routes/signin");
const redirect = require("../routes/redirect");

module.exports = function(app) {
  app.use(express.json());
  app.use("/", redirect);
  app.use("/api/url", url);
  app.use("/api/signin", signin);
  app.use("/api/user", user);
};
