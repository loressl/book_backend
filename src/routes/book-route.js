const express = require('express');
const router = express.Router();
const controller = require('../controllers/book-controller')
const authService = require('../service/auth-service')

router.get('/povCharacters',authService.authorize, controller.getPovCharacteresOfBook)
router.get('/covers',authService.authorize, controller.getCoverOfBook)
router.get('/',authService.authorize, controller.getAllBooks)

module.exports = router