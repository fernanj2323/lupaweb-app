const express = require('express');
const router = express.Router();

const service = require('../controllers/eServicesManagement.controller');


//rutas maestras 
//consultar estados posibles 
router.get('/getTendered', service.getTendered);
router.get('/getFinished', service.getFinished);
router.get('/getStatus' , service.getStatus)    
router.post('/createStatus', service.createStatus)
router.post('/changueStatus/:id', service.changueStatus)
//rutas de fase 1 
router.get('/newManagement', service.newManagement);
router.get('/questions', service.getQuestions);
router.get('/questions/:phase', service.getQuestions);
router.get('/', service.getManagements); //obtener todos 
router.post('/getManagementByCriticidad', service.getManagementByCriticidad); //buscar por criticidad  
router.post('/getManagementByStatus', service.getManagementByStatus); //buscar por criticidad  

router.get('/getManagementBySL/:sl', service.getManagementBySL); 
router.get('/checkFinish/:id', service.checkFinish);

router.get('/:id', service.getManagement); //obtener 1 
router.get('/gJpactivity', service.createManagement) 
router.post('/', service.createManagement);//crear 
router.put('/:id', service.editManagement);//editar
router.delete('/:id', service.deleteManagement);//eliminar
router.patch('/:id', service.approvedManagement);//patch 

//rutas de fase 2 
router.get('/criticalReq/ofmanagement', service.getCriticalReqOfManagement)//obtener todos
router.get('/criticalReq/ofmanagement/byId/:id', service.getCriticalReqById) //obtener by id de reqCritical 
router.get('/criticalReq/ofmanagement/byManagementId/:id', service.getCriticalReqOfManagementId) //obtener by id de managementID  
router.post('/criticalReq/ofmanagement', service.postCriticalReq) //crear  
router.put('/criticalReq/ofmanagement/:id', service.putCriticalReq) //editar 


//saltar de fase 
router.get('/upStatusOfManagement/:id', service.upStatusOfManagement)//obtener todos
//buscar por fecha 
router.post('/findByDate', service.findByDate)
module.exports = router; 