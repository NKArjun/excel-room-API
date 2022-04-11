const express = require('express');
const router = express.Router();
const authService = require('../services/auth');
const asynMiddleware = require('../middleware/async');


/* Authenticate user. */
router.post('/auth', asynMiddleware(authService.authUser()));

module.exports = router;