const express = require('express');
const router = express.Router();
const IRO = require('../../controllers/eservices/IRO.controller');


router.get('/getIroByManagementID/:id', IRO.getIroByManagementID); 
router.get('/getIros', IRO.getIros); 
router.post('/postIro', IRO.postIro);
router.post('/getIroByManagementIDandSL', IRO.getIroByManagementIDandSL);
router.put('/putIro/:id', IRO.putIro);


module.exports = router;