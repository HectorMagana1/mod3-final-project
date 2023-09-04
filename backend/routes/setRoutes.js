const express = require('express')
const router = express.Router();
const setController = require('../controllers/setController')
const { authorize } = require('../middleware/authMiddleware')
// D.U.C.S

// Delete
router.delete('/:exerciseId/:setId', authorize, setController.delete)

// Update
router.put('/:setId', authorize, setController.update) 

// Create
router.post('/:exerciseId', authorize, setController.create)

// Show
// router.get('/:setId', authorize, setController.show)

module.exports = router