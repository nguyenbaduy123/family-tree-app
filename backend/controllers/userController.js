const jwt = require("jsonwebtoken");

require("dotenv").config();
const User = require("../models/User");
const passwordUtils = require("../utils/passwordUtils");

const getUserById = (req, res) => {};

const createUser = async (req, res) => {
  const { password, ...userData } = req.body;
  userData.hash_password = await passwordUtils.hashPassword(password);
  const user = await User.createUser(userData);
  res.json(user);
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.login(email, password);
    if (user) {
      const token = jwt.sign({ user: user }, process.env.SECRET_KEY, {
        expiresIn: "72hr",
      });
      res.status(200).json({
        success: true,
        user: user,
        message: "Đăng nhập thành công",
        token: token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không chính xác",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Có lỗi xảy ra" });
    console.error("Login error: ", error);
  }
};

const updateUser = (req, res) => {};

const deleteUser = (req, res) => {};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};
