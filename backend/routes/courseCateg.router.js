const express = require('express');
const router = express.Router();
const courseCategs = require('../controllers/courseCategs.controller');

router.get('/', courseCategs.getCourseCategs);
router.post('/', courseCategs.createCourseCateg);
router.get('/:id', courseCategs.getCourseCateg);
router.put('/:id', courseCategs.editCourseCateg );
router.delete('/:id', courseCategs.deleteCourseCateg);

module.exports = router;