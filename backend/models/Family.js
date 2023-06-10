const Joi = require('joi')
const knex = require('../config/connection')
const { v4: uuidv4 } = require('uuid')

const familySchema = Joi.object({
  id: Joi.string(),
  owner_id: Joi.string().required(),
  name: Joi.string().required(),
})

class Family {
  createFamily = async (familyData) => {
    const data = { ...familyData, id: uuidv4() }
    const { error } = familySchema.validate(data)
    if (error) {
      return { success: false, message: error.details[0].message }
    }

    try {
      const family = await knex('families').insert(data).returning('*')
      return {
        success: true,
        message: 'Family created successfully',
        family: family,
      }
    } catch (error) {
      return { success: false, message: 'Failed to create family' }
    }
  }
}

module.exports = Family
