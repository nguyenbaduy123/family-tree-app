const express = require('express')
const router = express.Router()
const controller = require('../controllers/peopleController')
const authentication = require('../middleware/authentication')

router.route('/').post(controller.createPerson)
router
  .route('/:person_id')
  .delete(authentication.verifyToken, controller.deletePerson)
  .put(authentication.verifyToken, controller.updatePerson)

module.exports = router
