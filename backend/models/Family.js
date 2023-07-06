const _ = require('lodash')
const Joi = require('joi')
const knex = require('../config/connection')
const { v4: uuidv4 } = require('uuid')
const { success, serverError, notFound } = require('../utils/responseUtils')

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
      return success({ family: family })
    } catch (error) {
      console.error('Create family error: ', error)
      return { success: false, message: 'Failed to create family' }
    }
  }

  getFamilies = async (user_id) => {
    try {
      const families = await knex('families').where('owner_id', user_id)
      return { success: true, families: families, statusCode: 200 }
    } catch (error) {
      console.error('Get families error: ', error)
      return serverError()
    }
  }

  getFamily = async (user_id, family_id) => {
    try {
      const people_family = await knex('families as f')
        .where('owner_id', user_id)
        .andWhere('f.id', family_id)
        .join('people as p', 'f.id', 'p.family_id')
        .leftJoin(
          'parents_children as pc',
          knex.raw('?? = ANY(??)', ['p.id', 'pc.children'])
        )
        .orderBy('p.created_at')
        .select(
          'p.id as person_id',
          'pc.husband_id as father_id',
          'pc.wife_id as mother_id',
          'p.full_name',
          'p.gender',
          'p.role_in_family',
          'p.date_of_birth',
          'p.is_alive',
          'p.date_of_death'
        )

      const family = await knex('families').where('id', family_id).first()

      return success({ people_family, family })
    } catch (error) {
      console.error('Get family error: ', error)
      return serverError()
    }
  }

  updateFamily = async (id, familyData) => {
    try {
      await knex('families')
        .where('id', id)
        .update(_.pick(familyData, ['name', 'branch_name', 'address', 'story']))
      return success()
    } catch (error) {
      console.error('Update family failed: ', error)
      return serverError()
    }
  }

  deleteFamily = async (id) => {
    try {
      const [family] = await knex('families')
        .where('id', id)
        .del()
        .returning('*')
      if (family) return success()
      else return notFound()
    } catch (error) {
      console.error('Delete family failed: ', error)
      return serverError()
    }
  }
}

module.exports = Family
