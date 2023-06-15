const jwt = require('jsonwebtoken')

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
  const { email, password } = req.customParams
  const result = await user.login(email, password)
  if (result.success) {
    const token = jwt.sign({ user: result.user }, process.env.SECRET_KEY, {
      expiresIn: '72hr',
    })
    res.status(result.statusCode).json({
      ...result,
      token: token,
    })
  } else {
    res.status(result.statusCode).json({ ...result })
  }
}

const getUser = async (req, res) => {
  const user_id = req.customParams.user_id
  const result = await user.getUser(user_id)
  res.status(result.statusCode).json(result)
}

const updateUser = async (req, res) => {
  const userData = req.customParams
  const result = await user.updateUser(userData)
  if (result.success) {
    res.json(result)
  } else {
    res.status(500).json(result)
  }
}

const deleteUser = (req, res) => {}

module.exports = {
  getUserById,
  createUser,
  updateUser,
  login,
  getUser,
}
