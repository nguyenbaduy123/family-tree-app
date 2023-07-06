const Event = require('../models/Events')
const event = new Event()
const { response } = require('../utils/responseUtils')

const createEvent = async (req, res) => {
  const { user_id } = req.customParams
  const eventData = { ...req.customParams, created_by_id: user_id }
  const result = await event.createEvent(eventData)
  response(res, result)
}

const getEvent = async (req, res) => {
  const id = req.params.id
  const result = await event.getEvent(id)
  return response(res, result)
}

const deleteEvent = async (req, res) => {
  const id = req.params.id
  const result = await event.deleteEvent(id)
  return response(res, result)
}

const updateEvent = async (req, res) => {
  const id = req.params.id
  const eventData = req.customParams
  const result = await event.updateEvent(id, eventData)
  return response(res, result)
}

module.exports = { createEvent, deleteEvent, updateEvent, getEvent }
