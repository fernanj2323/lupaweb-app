const express = require('express');
const router = express.Router();
const closingPhase = require('../../controllers/eservices/closingPhase.controller');


router.get('/getClosingPhaseByManagementId/:id', closingPhase.getClosingPhaseByManagementId); 
router.get('/getClosingPhaseById/:id', closingPhase.getClosingPhaseById); 
router.post('/postClosing', closingPhase.postClosing);
router.put('/putClosing/:id', closingPhase.putClosing);


module.exports = router;