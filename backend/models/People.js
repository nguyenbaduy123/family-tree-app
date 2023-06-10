const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')

const _ = require('lodash')
require('dotenv').config()
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
  family_id: Joi.string().required(),
  image_url: Joi.string(),
  created_by_id: Joi.string().required(),
  generation: Joi.number(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
})

class People {
  createPerson = (personData) => {
    const data = {
      ..._.pick(personData, Object.keys(personSchema.describe().keys)),
      id: uuidv4(),
    }
    const { error, value } = personSchema.validate(data)
    if (error) {
      return { success: false, message: error.details[0].message }
    }
    try {
      const person = knex('people').insert(value).returning('*')
      return {
        success: true,
        message: 'Person created successfully',
        statusCode: 200,
        person: person,
      }
    } catch (error) {
      console.error('Create person error: ', error)
      return {
        success: false,
        message: 'Failed to create family',
        statusCode: 500,
      }
    }
  }

  deletePerson = async (userId) => {
    try {
      const person = await knex('people')
        .where('id', userId)
        .del()
        .returning('*')
      if (person.length) {
        return {
          success: true,
          message: 'User deleted successfully',
          statusCode: 200,
          person_deleted: person,
        }
      } else {
        return {
          success: false,
          message: 'Person is not existed',
          statusCode: 404,
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      return {
        success: false,
        message: 'Failed to delete person',
        statusCode: 500,
      }
    }
  }
}

module.exports = People
