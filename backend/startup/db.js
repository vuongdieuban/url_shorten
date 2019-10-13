const mongoose = require("mongoose");

module.exports = async function() {
  // Connect to Mongodb
  try {
    await mongoose.connect("mongodb://localhost/url_shortener", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Success! Connected to DB");
  } catch (err) {
    console.log("Fail to connect to DB\n", err.message);
    process.exit(1);
  }
};
