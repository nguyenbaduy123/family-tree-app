const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
