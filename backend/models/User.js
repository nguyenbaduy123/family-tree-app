const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')

require('dotenv').config()
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
    const data = { ...userData, id: uuidv4() }
    const { error } = userSchema.validate(data)
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
      const user = await knex('users').insert(data).returning('*')
      return { success: true, message: 'User created successfully', user: user }
    } catch (error) {
      console.error('Create user error: ', error)
      return { success: false, message: 'Failed to create user' }
    }
  }

  login = async (email, password) => {
    const user = await knex('users').where('email', email).first()
    if (user) {
      const isMatch = await comparePassword(password, user.hash_password)
      if (isMatch) return user
    }
    return null
  }
}

module.exports = User
