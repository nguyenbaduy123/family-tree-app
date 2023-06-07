const knex = require('../config/connection')

const User = {
  getAllUsers: () => {
    return knex('users').select()
  },
  getUserById: (id) => {
    return knex('users').where('id', id).first()
  },
  createUser: (userData) => {
    return knex('users').insert(userData).returning('*')
  },
}

module.exports = User
