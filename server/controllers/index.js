const express = require('express');
const router = express.Router();

const userController = require('./user');

router.user('./user', userController);

module.exports = router;