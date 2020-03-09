const express = require('express');
const router = express.Router();
const teacher = require('../controllers/teachers.controller');

router.get('/', teacher.getTeachers);
router.post('/', teacher.createTeacher);
router.get('/:id', teacher.getTeacher);
router.put('/:id', teacher.editTeacher );
router.delete('/:id', teacher.deleteTeacher);

module.exports = router;