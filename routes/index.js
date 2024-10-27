const express = require('express');
const router = express.Router();
const userAPI = require('./user.api');
const authAPI = require('./auth.api');

router.use('/user',userAPI);
router.use('/auth',authAPI);

module.exports = router;