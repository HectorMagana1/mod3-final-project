const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController')

// I.N.D.U.C.E.S

// Index view (dashboard)
router.get('/', exerciseController.index)

module.exports = router;