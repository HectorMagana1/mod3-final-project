const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController')

// I.N.D.U.C.E.S

// Index view (dashboard)
router.get('/', exerciseController.index)

// Delete 
router.delete('/', exerciseController.delete)

// Update
router.put('/:exerciseId', exerciseController.update)

// Create
router.post('/', exerciseController.create)

// Show
router.get('/:exerciseId', exerciseController.show)

module.exports = router;