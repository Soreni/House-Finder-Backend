const User = require("../dal/user");
const validate = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/key");

const generateAuthToken = (user) => {
  return jwt.sign({ _id: user._id, email: user.email }, config.JWT_KEY);
};

//register a user as signup
module.exports.createUser = async (req, res) => {
  const body = req.body;

  const { error } = validate(body);
  if (error) return res.status(404).json(error.details[0].message);
  try {
    let user = await User.checkUser({ email: body.email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User Already Registered" });

    //hashing password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(body.password, salt);
    console.log(`hash password: ${hashPassword}`);

    user = await User.create({
      fullName: body.fullName,
      email: body.email,
      password: hashPassword,
      countryCode: body.countryCode,
      phoneNumber: body.phoneNumber,
      verificationCode: body.verificationCode,
      isVerified: body.isVerified,
    });

    //create and asign token
    const token = generateAuthToken(user);
    res
      .status(200)
      .json({ success: true, message: "Successfully  Registered!", token });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};

exports.getUser = async (req, res) => {
  const user = await User.getById(req.params.id);
  if (!user)
    return res
      .status(404)
      .json({ success: false, message: "The client is not found!!!" });
  res.status(200).json({ success: true, user });
};

// Get all of Users
exports.getAll = async (req, res) => {
  let user = await User.getAll();
  res.status(200).json({ success: true, user });
};
// Get all of Users houses
exports.getAllHouses = async (req, res) => {
  let user = await User.getAllHouses({ _id: req.params.id });
  res.status(200).json({ success: true, user });
};
/**
 * Update a User
 *
 *
 */
exports.updateUser = async (req, res) => {
  const body = req.body;
  const { error } = validate(body);
  if (error) return res.status(404).json(error.details[0].message);
  try {
    let user = await User.update({ _id: req.params.id }, body);
    res
      .status(200)
      .json(
        _.pick(user, ["_id", "countryCode", "phoneNumber", "fullName", "email"])
      );
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};

exports.deleteUser = async (req, res) => {
  let user = await User.deleteById(req.params.id);
  res
    .status(200)
    .json(
      _.pick(user, ["_id", "countryCode", "phoneNumber", "email", "fullName"])
    );
};
