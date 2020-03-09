const express = require('express');
const router = express.Router();
const level = require('../controllers/elearningLevel.controller');

router.get('/', level.geteLearningLevels);
router.post('/', level.createeLearningLevel);
router.get('/:id', level.geteLearningLevel);
router.put('/:id', level.editeLearningLevel );
router.delete('/:id', level.deleteeLearningLevel);

module.exports = router;