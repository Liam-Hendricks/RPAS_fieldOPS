const express = require('express');
const router = express.Router();
const auth =require('../controller/authorisation.controller');
const { uploadFile, deleteFile, viewFile, updateFile,fieldOPSDOCS,deleteFieldOPS} = require('../controller/document.controlller');
//Defining all routes and API methods
router.get('/documents/view', auth.authenticateJWT, viewFile);
router.post('/documents/upload', uploadFile);
router.put('/documents/update', auth.authenticateJWT, updateFile);
router.delete('/documents/delete', auth.authenticateJWT, deleteFile);
router.delete('/documents/deleteFieldOPS',auth.authenticateJWT,deleteFieldOPS);
router.get('/documents/fieldOPSDOCS', auth.authenticateJWT,fieldOPSDOCS );

module.exports = router;