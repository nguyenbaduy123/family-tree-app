const Joi = require('joi')
const knex = require('../config/connection')

const familySchema = Joi.object({
  id: Joi.number().integer(),
  owner_id: Joi.string().required(),
  name: Joi.string().required(),
})

class Family {
  createFamily = async (familyData) => {
    const { error } = familySchema.validate(familyData)
    if (error) {
      return { success: false, message: error.details[0].message }
    }

    try {
      const family = await knex('families').insert(familyData).returning('*')
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
