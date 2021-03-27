const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller')
const authService = require('../service/auth-service')

router.post('/register', controller.post)
router.post('/login/authenticate', controller.login)
router.get('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router