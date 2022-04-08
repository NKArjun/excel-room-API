const express = require('express');
const router = express.Router();
const authService = require('../services/auth');


/* Authenticate user. */
router.post('/auth', authService.authUser);

module.exports = router;