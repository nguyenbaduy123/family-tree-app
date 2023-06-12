const express = require('express')
const router = express.Router()
const controller = require('../controllers/peopleController')
const authentication = require('../middleware/authentication')

router.route('/').post(authentication.verifyToken, controller.createPerson)
router
  .route('/:person_id')
  .delete(authentication.verifyToken, controller.deletePerson)

module.exports = router
