const express = require('express');
const router = express.Router();
const results = require('../../controllers/eLearning/results.controller');

router.get('/', results.getResult);
router.get('/getResultByCourseId/:id', results.getResultByCourseId);
router.get('/getResultByUserId/:id', results.getResultByUserId);
router.get('/getViewPPT/:id', results.getViewPPT);
router.post('/', results.createResult);

module.exports = router;