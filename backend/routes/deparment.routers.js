const express = require('express');
const router = express.Router();
const departments = require('../controllers/departments.controller');

router.get('/', departments.getDeparments);
router.post('/', departments.createDepartment);
router.get('/:id', departments.getDepartment);
router.put('/:id', departments.editDepartment );
router.delete('/:id', departments.deleteDepartment);

module.exports = router;