const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController')
const { authorize } = require('../middleware/authMiddleware')

// I.N.D.U.C.E.S

// Index view (dashboard)
router.get('/', authorize,  exerciseController.index)

// Delete 
router.delete('/:exerciseId', authorize, exerciseController.delete)

// Update
router.put('/:exerciseId', authorize, exerciseController.update)

// Create
router.post('/', authorize, exerciseController.create)

// Show
router.get('/:exerciseId', authorize, exerciseController.show)

module.exports = router;