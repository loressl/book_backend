const express = require('express');
const router = express.Router();
const controller = require('../controllers/povCharacter-controller')

router.get('/povCharacter', controller.getPovCharacter)
router.get('/books',controller.getAllBooksOfPovCharacter)
router.get('/', controller.getAllPovCharacters)

module.exports = router