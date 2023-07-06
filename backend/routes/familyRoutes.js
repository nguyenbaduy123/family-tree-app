const express = require('express')
const router = express.Router()
const controller = require('../controllers/familyController')
const authentication = require('../middleware/authentication')

router
  .route('/')
  .post(controller.createFamily)
  .get(authentication.verifyToken, controller.getFamilies)

router.use(authentication.verifyToken)

router
  .route('/:id')
  .get(controller.getFamily)
  .delete(controller.deleteFamily)
  .put(controller.updateFamily)

module.exports = router
