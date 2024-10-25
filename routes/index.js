const express = require('express');
const router = express.Router();
const userAPI = require('./user.api');


router.use('/user',userAPI);

module.exports = router;