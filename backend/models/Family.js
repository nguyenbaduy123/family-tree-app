const _ = require('lodash')
const Joi = require('joi')
const knex = require('../config/connection')
const { v4: uuidv4 } = require('uuid')

const familySchema = Joi.object({
  id: Joi.string().required(),
  owner_id: Joi.string().required(),
  name: Joi.string().required(),
  branch_name: Joi.string(),
  address: Joi.string(),
  story: Joi.string(),
})

class Family {
  createFamily = async (familyData) => {
    const data = {
      ..._.pick(familyData, Object.keys(familySchema.describe().keys)),
      id: uuidv4(),
    }
    const { error, value } = familySchema.validate(data)

    if (error) {
      return { success: false, message: error.details[0].message }
    }

    try {
      const family = await knex('families').insert(value).returning('*')
      return {
        success: true,
        message: 'Family created successfully',
        family: family,
      }
    } catch (error) {
      console.log('Create family error: ', error)
      return { success: false, message: 'Failed to create family' }
    }
  }

  getFamilies = async (user_id) => {
    try {
      const families = await knex('families').where('owner_id', user_id)
      return { success: true, families: families, statusCode: 200 }
    } catch (error) {
      console.error('Get families error: ', error)
      return {
        success: false,
        statusCode: 500,
        message: 'Failed to get family',
      }
    }
  }
}

module.exports = Family
