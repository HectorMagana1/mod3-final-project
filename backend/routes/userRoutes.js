const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authorize } = require('../middleware/authMiddleware')

router.get('/', authorize, userController.show)

router.delete('/', authorize, userController.delete)

router.put('/', authorize, userController.update)

module.exports = router