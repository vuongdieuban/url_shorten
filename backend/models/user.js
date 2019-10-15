const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  urls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Url" }]
});

// Add method to userSchema (user object) to create token, 'this' refer to specific user object
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      urls: this.urls,
      iat: new Date().getTime(), //current time (issue at)
      exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day ahead (expire date)
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
