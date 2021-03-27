const express = require('express');
const router = express.Router();
const controller = require('../controllers/povCharacter-controller')
const authService = require('../service/auth-service')

router.get('/povCharacter', authService.authorize, controller.getPovCharacter)
router.get('/books',authService.authorize, controller.getAllBooksOfPovCharacter)
router.get('/', authService.authorize, controller.getAllPovCharacters)

module.exports = router