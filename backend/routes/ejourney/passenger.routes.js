const express = require('express');
const router = express.Router();

const passenger = require('../../controllers/ejourney/passengers.controller');

router.get('/', passenger.getPassengers);
router.post('/', passenger.createPassenger);
router.get('/:id', passenger.getPassenger);
router.put('/:id', passenger.editPassenger);
router.delete('/:id', passenger.deletePassenger);

module.exports = router;