require('dotenv').config()
const knex = require('../config/connection')

class People {
  createPerson = (personData) => {
    return knex('people').insert(personData).returning('*')
  }
}

module.exports = People
