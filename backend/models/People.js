const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')

const _ = require('lodash')
const { pick } = require('lodash')
const knex = require('../config/connection')

const peopleService = require('../services/peopleService')

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
  createPerson = async (personData) => {
    const data = {
      ..._.pick(personData, Object.keys(personSchema.describe().keys)),
      id: uuidv4(),
    }

    const { error, value } = personSchema.validate(data)
    if (error) {
      return {
        success: false,
        statusCode: 500,
        message: error.details[0].message,
      }
    }

    try {
      const family = await knex('families')
        .select('*')
        .where('id', value.family_id)
        .andWhere('owner_id', value.created_by_id)
        .first()

      if (!family) {
        return {
          success: false,
          message: 'You do not have permission for this family',
          statusCode: 401,
        }
      }

      const [person] = await knex('people').insert(value).returning('*')

      const { father_id, mother_id } = personData
      if (father_id || mother_id) {
        peopleService.updateChildren(father_id, mother_id, value.id)
      }

      return {
        success: true,
        message: 'Person created successfully',
        statusCode: 200,
        person: { ...person, father_id: father_id, mother_id: mother_id },
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

  updatePerson = async (personId, personData) => {
    try {
      const person = await knex('people')
        .select('*')
        .where('id', personId)
        .andWhere('created_by_id', personData.user_id)
        .first()
      if (!person)
        return { success: false, statusCode: 200, message: 'No permission' }
      const updatedData = {
        ...pick(personData, [
          'full_name',
          'gender',
          'citizen_id',
          'role_in_family',
          'blood_group',
          'date_of_birth',
          'home_address',
          'current_address',
          'phone',
          'is_alive',
          'date_of_death',
          'generation',
          'story',
          'image_url',
        ]),
        updated_at: new Date(),
      }

      const result = await knex('people')
        .where('id', personId)
        .update(updatedData)

      return {
        success: true,
        message: 'Person updated successfully',
        statusCode: 200,
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
