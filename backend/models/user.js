const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  urlId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Url" }]
});

const User = mongoose.model("User", userSchema);

module.exports.User = User;
