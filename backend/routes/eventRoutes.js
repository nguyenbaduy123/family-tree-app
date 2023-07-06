const express = require('express')
const router = express.Router()
const controller = require('../controllers/eventController')
const authentication = require('../middleware/authentication')

router.route('/').post(controller.createEvent)

router
  .route('/:id')
  .get(controller.getEvent)
  .put(controller.updateEvent)
  .delete(controller.deleteEvent)

module.exports = router
