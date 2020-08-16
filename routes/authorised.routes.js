const express = require('express');
const router = express.Router();
const { register,login,facebookAuth } = require('../controller/authorisation.controller');


router.post('/signup', register);
router.post('/signin', login);
//Facebook Auth
router.post('/facebook-loggin',facebookAuth)


module.exports = router;