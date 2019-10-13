const mongoose = require("mongoose");

module.exports = function() {
  // Connect to Mongodb
  mongoose
    .connect("mongodb://localhost/url_shortener", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("Success! Connected to DB"))
    .catch(() => console.log("Fail to connect to DB"));
};
