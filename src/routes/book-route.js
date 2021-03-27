const express = require('express');
const router = express.Router();
const controller = require('../controllers/book-controller')

router.get('/povCharacters', controller.getPovCharacteresOfBook)
router.get('/covers', controller.getCoverOfBook)
router.get('/', controller.getAllBooks)

module.exports = router