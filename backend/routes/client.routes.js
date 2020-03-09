const express = require('express');
const router = express.Router();
const clients = require ('../controllers/clients.controller');


router.get('/', clients.getClients);
router.post('/', clients.createClient);
router.get('/:id', clients.getClient);
router.put('/:id', clients.editClient );
router.delete('/:id', clients.deleteClient);

module.exports = router;