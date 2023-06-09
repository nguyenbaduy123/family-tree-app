const jwt = require('jsonwebtoken')

require('dotenv').config()
const User = require('../models/User')
const passwordUtils = require('../utils/passwordUtils')
const user = new User()

const getUserById = (req, res) => {}

const createUser = async (req, res) => {
  const { password, ...userData } = req.body
  userData.hash_password = await passwordUtils.hashPassword(password)
  const result = await user.createUser(userData)
  if (result.success) {
    res.json(result)
  } else {
    res.status(409).json(result)
  }
}

const login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  try {
    const result = await user.login(email, password)
    if (result) {
      const token = jwt.sign({ user: result }, process.env.SECRET_KEY, {
        expiresIn: '72hr',
      })
      res.status(200).json({
        success: true,
        user: result,
        message: 'Đăng nhập thành công',
        token: token,
      })
    } else {
      res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác',
      })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Có lỗi xảy ra' })
    console.error('Login error: ', error)
  }
}

const updateUser = (req, res) => {}

const deleteUser = (req, res) => {}

module.exports = {
  getUserById,
  createUser,
  updateUser,
  login,
}
