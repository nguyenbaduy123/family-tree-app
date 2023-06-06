require('dotenv').config()
const knex = require('../config/connection')

const People = {
  getAllUsers: () => {
    return knex('users').select()
  },
  createPerson: (personData) => {
    return knex('people').insert(personData).returning('*')
  },
}

module.exports = User
