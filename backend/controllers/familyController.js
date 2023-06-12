require('dotenv').config()
const Family = require('../models/Family')
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

module.exports = { createFamily }
