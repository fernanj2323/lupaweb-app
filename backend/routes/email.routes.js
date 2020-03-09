const express = require('express');
const router = express.Router();

const email = require('../controllers/email.controller');

router.post('/', email.postNotifications);//crear notificacion

module.exports = router; 