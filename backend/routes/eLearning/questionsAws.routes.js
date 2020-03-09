const express = require('express');
const router = express.Router();
const questionsAws = require('../../controllers/eLearning/questionsAws.controller');

router.get('/', questionsAws.getQuestions);
router.get('/getQuestionsByCourseId/:id', questionsAws.getQuestionsByCourseId);
router.post('/', questionsAws.createQuestion);
router.put('/editQuestion/:id', questionsAws.editQuestion);

module.exports = router;