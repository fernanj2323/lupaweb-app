const express = require('express');
const router = express.Router();
const subModule = require('../controllers/eLearningSubModule.controller');

router.get('/', subModule.getSubModules);
router.post('/', subModule.createSubModule);
router.get('/:id', subModule.getSubModule);
router.get('/subModuleByModule/:id', subModule.getSubModuleBymodule);
router.get('/subModuleByModuleFirst/:id', subModule.getSubModuleByModuleFirst);
router.put('/:id', subModule.editSubModule );
router.delete('/:id', subModule.deleteSubModule);


module.exports = router;