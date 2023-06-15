const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')
const authentication = require('../middleware/authentication')

router
  .route('/')
  .post(controller.createUser)
  .put(authentication.verifyToken, controller.updateUser)
router
  .route('/:user_id')
  .put(controller.updateUser)
  .get(authentication.verifyToken, controller.getUser)
router.route('/login').post(controller.login)

module.exports = router
