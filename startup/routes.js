const express = require("express");

module.exports = function(app) {
  app.use(express.json());
  app.get("/", (req, res) => {
    res.send("hello");
  });
};
