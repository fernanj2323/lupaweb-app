const express = require('express');
const router = express.Router();
const course = require('../controllers/courses.controller');

router.get('/', course.getCourses);
router.post('/', course.createCourse); 
router.get('/:id', course.getCourse);
router.put('/:id', course.editCourse );
router.delete('/:id', course.deleteCourse);

module.exports = router;