require('dotenv').config()
const Joi = require('joi')
const knex = require('../config/connection')

const personSchema = Joi.object({
  id: Joi.string().required(),
  full_name: Joi.string(),
  gender: Joi.string(),
  citizen_id: Joi.string(),
  role_in_family: Joi.string(),
  blood_group: Joi.string(),
  date_of_birth: Joi.date(),
  home_address: Joi.string(),
  current_address: Joi.string(),
  phone: Joi.string(),
  is_alive: Joi.boolean(),
  date_of_death: Joi.date(),
  story: Joi.string(),
  family_id: Joi.string(),
  image_url: Joi.string(),
  created_by_id: Joi.string(),
  generation: Joi.number(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
})

class People {
  createPerson = (personData) => {
    return knex('people').insert(personData).returning('*')
  }
}

module.exports = People
