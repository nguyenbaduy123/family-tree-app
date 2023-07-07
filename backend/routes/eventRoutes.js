const express = require('express')
const router = express.Router()
const controller = require('../controllers/eventController')

router.route('/').post(controller.createEvent)

router.route('/all/:family_id').get(controller.getAllEvent)

router
  .route('/:id')
  .get(controller.getEvent)
  .put(controller.updateEvent)
  .delete(controller.deleteEvent)

module.exports = router
