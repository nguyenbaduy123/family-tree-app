const _ = require('lodash')
const Joi = require('joi')
const knex = require('../config/connection')
const { pick } = require('lodash')
const { v4: uuidv4 } = require('uuid')
const { success, notFound, serverError } = require('../utils/responseUtils')

const eventSchema = Joi.object({
  id: Joi.string().uuid().required(),
  family_id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  time: Joi.date().required(),
  notice: Joi.boolean(),
  calendar: Joi.string().valid('solar', 'lunar'),
  repeat: Joi.boolean(),
  type: Joi.string(),
  description: Joi.string(),
  location: Joi.string(),
  note: Joi.string(),
  created_by_id: Joi.string().uuid().required(),
})

class Event {
  getAllEvent = async (user_id) => {
    try {
      const events = await knex('events as e')
        .join('families as f', 'f.id', 'e.family_id')
        .join('users as u', 'u.id', 'f.owner_id')
        .where('u.id', user_id)
        .select(
          'e.name',
          'e.family_id',
          'e.time',
          'e.notice',
          'e.repeat',
          'e.calendar',
          'e.type',
          'e.description',
          'e.location',
          'e.note',
          'e.created_by_id'
        )
      return success({ events })
    } catch (error) {
      console.error('Get events failed: ', error)
      serverError()
    }
  }

  createEvent = async (eventData) => {
    const data = {
      ..._.pick(eventData, Object.keys(eventSchema.describe().keys)),
      id: uuidv4(),
    }
    const { error, value } = eventSchema.validate(data)
    if (error) {
      return serverError(error.details[0].message)
    }

    try {
      const [event] = await knex('events').insert(value).returning('*')
      return success({ event: event })
    } catch (error) {
      console.error('Create event error: ', error)
      return serverError()
    }
  }

  getEvent = async (id) => {
    try {
      const event = await knex('events').where('id', id).first()
      if (event) {
        return success({ event: event })
      } else {
        return notFound('Event is not existed')
      }
    } catch (error) {
      console.error('Get event error: ', error)
      return serverError()
    }
  }

  getListEvent = async (family_id) => {
    try {
      const listEvent = await knex('events as e')
        .join('families as f', 'f.id', 'e.family_id')
        .select('*')
      return success({ events: listEvent })
    } catch (error) {
      console.error('Get list event failed: ', error)
      return serverError()
    }
  }

  deleteEvent = async (id) => {
    try {
      const event = await knex('events').where('id', id).del().returning('*')
      if (event.length) {
        return success({ event: event }, 'Event deleted successfully')
      } else {
        return notFound('Event is not existed')
      }
    } catch (error) {
      console.error('Delete event failed')
      return serverError()
    }
  }

  updateEvent = async (id, eventData) => {
    try {
      await knex('events')
        .where('id', id)
        .update(
          pick(eventData, [
            'name',
            'time',
            'notice',
            'calendar',
            'repeat',
            'type',
            'description',
            'location',
            'note',
          ])
        )
      return success()
    } catch (error) {
      console.error('Error updating user:', error)
      return serverError()
    }
  }
}

module.exports = Event
