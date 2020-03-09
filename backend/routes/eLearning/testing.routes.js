const express = require('express');
const router = express.Router();
const testing = require('../../controllers/eLearning/testings.controller');

router.get('/', testing.getTesting);
router.get('/getTestingByCourseId/:id', testing.getTestingByCourseId);
router.get('/getTestingByCourseUser/:id/:user_id', testing.getTestingByCourseUser);
router.get('/getTestingByToken/:id', testing.getTestingByToken);
router.get('/getTotalGood/:id/:user_id/:token', testing.getTotalGood);
router.get('/getTotalAnsw/:id/:user_id/:token', testing.getTotalAnsw);
router.post('/', testing.createTesting);
router.put('/editTesting/:id', testing.editTesting);

module.exports = router;