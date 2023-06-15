const jwt = require('jsonwebtoken')

const People = require('../models/People')

const person = new People()

const createPerson = async (req, res) => {
  const personData = {
    ...req.customParams,
    created_by_id: req.customParams.user_id,
  }
  const result = await person.createPerson(personData)
  res.status(result.statusCode).json(result)
}

const deletePerson = async (req, res) => {
  const personId = req.customParams.person_id || req.params.person_id
  const result = await person.deletePerson(personId)
  res.status(result.statusCode).json(result)
}

module.exports = {
  createPerson,
  deletePerson,
}
