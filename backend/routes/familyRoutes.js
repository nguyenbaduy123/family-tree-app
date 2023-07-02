const express = require('express')
const router = express.Router()
const controller = require('../controllers/familyController')
const authentication = require('../middleware/authentication')

router
  .route('/')
  .post(controller.createFamily)
  .get(authentication.verifyToken, controller.getFamilies)

router
  .route('/:family_id')
  .get(authentication.verifyToken, controller.getFamily)

module.exports = router
