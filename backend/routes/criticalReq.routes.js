const express = require('express');
const router = express.Router();

const req = require('../controllers/criticalReq.controller');


// ruta anterior  /api/criticalsreq

//pozos 
router.get('/wells', req.getWellConditions);
router.post('/well', req.createWellCondition);
router.put('/well/:id' ,req.editWellCondition );
//operaciones
router.get('/operations', req.getOperationConditions);
router.post('/operation', req.createOperationCondition);
router.put('/operation/:id' ,req.editOperationCondition );
//hse
router.get('/hses', req.getHseConditions);
router.post('/hse', req.createHseCondition);
router.put('/hse/:id' ,req.editHseCondition );

//technology
router.get('/technologys', req.getTechnologyConditions);
router.post('/technology', req.createTechnologyCondition);
router.put('/technology/:id' ,req.editTechnologyCondition );

module.exports = router; 