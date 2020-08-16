const express = require('express');
const router = express.Router();
const auth =require('../controller/authorisation.controller');
const {updateFieldOps,LatestUserData,Location,DeleteAccount} = require('../controller/user.controller');


//Defining all routes and API methods
router.put('/user/update_fieldOPS', auth.authenticateJWT, updateFieldOps);
router.get('/user/latest_data', auth.authenticateJWT, LatestUserData);
router.get('/user/location',auth.authenticateJWT, Location);
router.delete('/user/deleteAccount',auth.authenticateJWT, DeleteAccount)
module.exports = router;