const express = require('express');
const router = express.Router();
const userService = require('../services/user');
const auth = require('../middleware/auth');
const asyncMiddleware = require('../middleware/async');

/* Add users. */
router.post('/add', asyncMiddleware(userService.addUser()));

router.get('/getUser', auth, asyncMiddleware(userService.getUser()));

router.get('/getUsers', auth, asyncMiddleware(userService.getUsers()));

module.exports = router;
