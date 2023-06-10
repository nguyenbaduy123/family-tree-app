const express = require('express')
const router = express.Router()
const controller = require('../controllers/familyController')

router.route('/').post(controller.createFamily)

module.exports = router
