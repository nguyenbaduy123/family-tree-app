const User = require('../models/User')
const passwordUtils = require('../utils/passwordUtils')

const getAllUsers = (req, res) => {}

const getUserById = (req, res) => {}

const createUser = async (req, res) => {
  const { password, ...userData } = req.body
  userData.hash_password = await passwordUtils.hashPassword(password)
  const user = await User.createUser(userData)
  res.json(user)
}

const updateUser = (req, res) => {}

const deleteUser = (req, res) => {}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
