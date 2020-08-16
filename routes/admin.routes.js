const express = require('express');
const router = express.Router();
const auth =require('../controller/authorisation.controller');
const {GetUserAccounts,ADMIN_UPDATE_ACCOUNT} = require('../controller/admin.controller');


//Defining all routes and API methods
router.get('/admin/accounts', auth.authenticateJWT, GetUserAccounts);
router.put('/admin/update',auth.authenticateJWT,ADMIN_UPDATE_ACCOUNT);
module.exports = router;