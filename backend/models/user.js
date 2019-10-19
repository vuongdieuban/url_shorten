const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");

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
      googleId: this.googleId,
      name: this.name,
      email: this.email,
      iat: new Date().getTime(), //current time (issue at)
      exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day ahead (expire date)
    },
    config.get("JwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

const validate = body => {
  const schema = {
    urls: Joi.array()
      .items(Joi.string())
      .required()
  };
  const result = Joi.validate(body, schema);
  return result;
};

module.exports.User = User;
module.exports.validate = validate;
