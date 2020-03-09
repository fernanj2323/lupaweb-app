const express = require('express');
const router = express.Router();

const driver = require('../../controllers/ejourney/drivers.controller');

router.get('/', driver.getDrivers);
router.post('/', driver.createDriver);
router.get('/:id', driver.getDriver);
router.put('/:id', driver.editDriver);
router.delete('/:id', driver.deleteDriver);

module.exports = router;