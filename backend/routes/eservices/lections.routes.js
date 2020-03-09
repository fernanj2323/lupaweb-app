const express = require('express');
const router = express.Router();

const lections = require('../../controllers/eservices/lections')

router.get('/getLectionByManagementId/:managementId', lections.getLectionByManagementId)
router.post('/postLection', lections.postLection)
router.put('/putLection/:id', lections.putLection)

module.exports = router;