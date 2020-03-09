const express = require('express');
const router = express.Router();
const questions = require('../../controllers/eservices/workPreparationQuestions.controller')
const workPreparation = require('../../controllers/eservices/workPreparation.controller');



//work preparation, respuestas de esas preguntas
router.get('/getWorkpreparationByManagementId/:id', workPreparation.getWorkpreparationByManagementId); 
router.post('/saveWorkPreparation', workPreparation.saveWorkPreparation);
router.put('/editWork/:id', workPreparation.editWork);
//find by management id and service line 
// generally for admin users
router.post('/getWorkpreparationByManagementIdandSl/:managementId', workPreparation.getWorkpreparationByManagementIdandSl);
//find by managemtnr  id and auth id, for basic users 
router.post('/getWorkpreparationByManagementIdandAuthId/:managementId', workPreparation.getWorkpreparationByManagementIdandAuthId);


//questions from DB
router.get('/', questions.getQuestions) 
router.post('/',questions.createQuestion)
router.post('/getQuestionsByServiceLine',questions.getQuestionsByServiceLine)


//hse Elements 
router.post('/saveHseElements', workPreparation.saveHseElements);
router.put('/editHseElements/:id', workPreparation.editHseElements);
router.post('/getHseElements', workPreparation.getHseElements);

//fi requirements 
router.post('/getFiRequierements', workPreparation.getFiRequierements);
router.put('/editFiRequirements/:id', workPreparation.editFiRequirements);
router.post('/createFiRequirements', workPreparation.createFiRequirements);


module.exports = router;