const express = require('express');
const router = express.Router();
const userService = require('../services/user');

/* Add users. */
router.post('/add', userService.addUser);

router.get('/getUser/:email', userService.getUser);

router.get('/getUsers', userService.getUsers);

module.exports = router;
