require('dotenv').config()
const Joi = require('joi')
const knex = require('../config/connection')
const { comparePassword } = require('../utils/passwordUtils')

const userSchema = Joi.object({
  id: Joi.number().integer(),
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

  async createUser(userData) {
    const { error } = userSchema.validate(userData)
    if (error) {
      return { success: false, message: error.details[0].message }
    }

    const { email, username } = userData

    const existingUser = await knex('users')
      .where('email', email)
      .orWhere('username', username)
      .first()

    if (existingUser) {
      return { success: false, message: 'Email or username already exists' }
    }

    try {
      const user = await knex('users').insert(userData).returning('*')
      return { success: true, message: 'User created successfully', user: user }
    } catch (error) {
      return { success: false, message: 'Failed to create user' }
    }
  }

  async login(email, password) {
    const user = await knex('users').where('email', email).first()
    if (user) {
      const isMatch = await comparePassword(password, user.hash_password)
      if (isMatch) return user
    }
    return null
  }
}

module.exports = User
