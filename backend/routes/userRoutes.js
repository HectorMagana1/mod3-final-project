const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authorize } = require('../middleware/authMiddleware')

router.get('/', authorize, userController.show)

module.exports = router