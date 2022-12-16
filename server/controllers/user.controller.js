const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, `${process.env.SECRET}`, { expiresIn: "3d" });
};

// Login user
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup user
module.exports.signupUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const user = await User.signup(userName, email, password);
    const token = createToken(user._id);
    res.status(200).json({ userName, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};