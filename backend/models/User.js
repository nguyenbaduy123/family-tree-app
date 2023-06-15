const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const _ = require('lodash')
const { pick } = require('lodash')

const knex = require('../config/connection')
const { comparePassword } = require('../utils/passwordUtils')

const userSchema = Joi.object({
  id: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  hash_password: Joi.string().required(),
  full_name: Joi.string(),
  role: Joi.string(),
  created_at: Joi.date(),
  access_token: Joi.string(),
  avatar: Joi.string(),
  phone: Joi.string(),
})

class User {
  getAllUsers() {
    return knex('users').select()
  }

  getUserById(id) {
    return knex('users').where('id', id).first()
  }

  createUser = async (userData) => {
    const data = {
      ..._.pick(userData, Object.keys(userSchema.describe().keys)),
      id: uuidv4(),
    }
    const { error, value } = userSchema.validate(data)
    if (error) {
      return { success: false, message: error.details[0].message }
    }

    try {
      const { email, username } = userData
      const existingUser = await knex('users')
        .where('email', email)
        .orWhere('username', username)
        .first()
      if (existingUser) {
        return { success: false, message: 'Email or username already exists' }
      }
      const user = await knex('users').insert(value).returning('*')
      return { success: true, message: 'User created successfully', user: user }
    } catch (error) {
      console.error('Create user error: ', error)
      return { success: false, message: 'Failed to create user' }
    }
  }

  getUser = async (id) => {
    try {
      const user = await knex('users')
        .select('username', 'email', 'full_name', 'avatar', 'phone')
        .where('id', id)
        .first()
      return { success: true, user: user, statusCode: 200 }
    } catch (error) {
      console.error('Get user error: ', error)
      return { success: false, message: 'Failed to get user', statusCode: 500 }
    }
  }

  updateUser = async (userData) => {
    try {
      await knex('users')
        .where('id', userData.user_id)
        .update(pick(userData, ['full_name', 'avatar', 'phone']))

      return { success: true, message: 'User updated successfully!' }
    } catch (error) {
      console.error('Error updating user:', error)
      return { success: false, message: 'Failed to create user' }
    }
  }

  login = async (email, password) => {
    try {
      const user = await knex('users').where('email', email).first()
      if (user) {
        const isMatch = await comparePassword(password, user.hash_password)
        if (isMatch)
          return {
            user: user,
            success: true,
            message: 'Đăng nhập thành công',
            statusCode: 200,
          }
      }
      return {
        success: false,
        message: 'Tài khoản hoặc mật khẩu không chính xác',
        statusCode: 401,
      }
    } catch (error) {
      console.error('Login error: ', error)
      return { success: false, message: 'Có lỗi xảy ra', statusCode: 500 }
    }
  }
}

module.exports = User
