const Family = require('../models/Family')
const { response } = require('../utils/responseUtils')
const family = new Family()

const createFamily = async (req, res) => {
  let familyData = req.customParams
  familyData.owner_id = familyData.user_id
  const result = await family.createFamily(familyData)
  if (result.success) {
    res.json(result)
  } else {
    res.status(500).json(result)
  }
}

const getFamilies = async (req, res) => {
  const { user_id } = req.customParams
  const result = await family.getFamilies(user_id)
  res.status(result.statusCode).json(result)
}

const getFamily = async (req, res) => {
  const id = req.params.id
  const { user_id } = req.customParams
  const result = await family.getFamily(user_id, id)
  res.status(result.statusCode).json(result)
}

const updateFamily = async (req, res) => {
  const id = req.params.id
  const familyData = req.customParams
  const result = await family.updateFamily(id, familyData)
  return response(res, result)
}

const deleteFamily = async (req, res) => {
  const id = req.params.id
  const result = await family.deleteFamily(id)
  return response(res, result)
}

module.exports = {
  createFamily,
  getFamilies,
  getFamily,
  updateFamily,
  deleteFamily,
}
