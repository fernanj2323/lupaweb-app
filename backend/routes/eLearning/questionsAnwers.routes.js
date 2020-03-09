const express = require('express');
const router = express.Router();
const quesAndAns = require('../../controllers/eLearning/eLearningQuestionsAnswer');


router.get('/getQuestionsByCourseId/:id', quesAndAns.getQuestionsByCourseId);
router.post('/createQuestion', quesAndAns.createQuestion);
router.post('/editQuestion/:id', quesAndAns.editQuestion);


module.exports = router;