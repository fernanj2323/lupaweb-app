const express = require('express');
const router = express.Router();

const notification = require('../controllers/notification.controller');


router.get('/count/:id', notification.countNotifications);
router.get('/:id', notification.getNotifications);
router.get('/getById/:id', notification.getNotificationById);
router.patch('/getByCreatorId/:id', notification.getNotificationsByCreatorId);
router.post('/', notification.createNotification);//crear 
router.post('/findActionsNot', notification.findActionsNot);//findActionsNot 
router.put('/:id', notification.editNotification);//editar
router.delete('/:id', notification.deleteNotification);//eleiminar
module.exports = router; 