const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { authorize } = require('../middleware/authMiddleware')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.delete('/:userId', authorize, authController.delete)
router.put('/:userId', authorize, authController.update)

module.exports = router