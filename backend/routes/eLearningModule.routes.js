const express = require('express');
const router = express.Router();
const eLearningModule = require('../controllers/eLearningModule.controller');

router.get('/', eLearningModule.getLearningModules);
router.post('/', eLearningModule.createLearningModule);
router.get('/:id', eLearningModule.getLearningModule);
router.put('/:id', eLearningModule.editModel );
router.delete('/:id', eLearningModule.deleteModule);
router.get('/getModuleByCourse_id/:id', eLearningModule.getModuleByCourse_id);
module.exports = router;