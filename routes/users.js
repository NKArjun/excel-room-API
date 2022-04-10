const express = require('express');
const router = express.Router();
const userService = require('../services/user');
const auth = require('../middleware/auth');

/* Add users. */
router.post('/add', userService.addUser);

router.get('/getUser', auth, userService.getUser);

router.get('/getUsers', auth, userService.getUsers);

module.exports = router;
