const express = require('express')
const router = express.Router()
const controller = require('../controllers/familyController')
const authentication = require('../middleware/authentication')

router.route('/').post(controller.createFamily).get(controller.getFamilies)

router
  .route('/:id')
  .get(controller.getFamily)
  .delete(controller.deleteFamily)
  .put(controller.updateFamily)

module.exports = router
