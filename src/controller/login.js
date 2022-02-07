const User = require("../dal/user");
const Joi = require("joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("../config/key");
const bcrypt = require("bcrypt");

const generateAuthToken = (user) => {
  return jwt.sign({ _id: user._id, email: user.email }, config.JWT_KEY);
};

//login a user
module.exports.loginUser = async (req, res) => {
  const body = req.body;

  const { error } = validate(body);
  if (error) return res.status(404).json(error.details[0].message);
  try {
    const user = await User.checkUser({ email: body.email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User is not registered" });

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword)
      return res
        .status(404)
        .json({ success: false, message: "Invalid Email or Password" });

    //create and asign token
    const token = generateAuthToken(user);

    res
      .header("auth-token", token)
      .status(200)
      .json({ success: true, message: "Logged in...", token });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(8).max(50).required(),
    password: Joi.string().min(4).max(50).required(),
  });
  return schema.validate(req);
}
