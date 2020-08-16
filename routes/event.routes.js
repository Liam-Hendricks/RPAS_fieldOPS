const express = require('express');
const router = express.Router();
const auth =require('../controller/authorisation.controller');
const {createEventCard,updateEvent,findEvents,deleteEvent} = require('../controller/event.controller');
//Defining all routes and API methods
router.post('/events/create', auth.authenticateJWT, createEventCard);
router.put('/events/update', auth.authenticateJWT, updateEvent);
router.get('/events/view', auth.authenticateJWT, findEvents);
router.delete('/events/delete', auth.authenticateJWT, deleteEvent);

module.exports = router;