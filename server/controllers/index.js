const express = require('express');
const router = express.Router();

const userController = require('./user');
const igdbController = require('./igdb');

router.use('/user', userController);
router.use('/igdb', igdbController);

module.exports = router;