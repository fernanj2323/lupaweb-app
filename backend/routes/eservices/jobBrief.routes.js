const express = require('express');
const router = express.Router();
const jobBrief = require('../../controllers/eservices/jobBrief.controller')

router.get('/getJobBymanagementId/:managementId', jobBrief.getJobBymanagementId);
router.post('/getJobBymanagementIdAndServiceLine', jobBrief.getJobBymanagementIdAndServiceLine);
router.get('/getJobById/:id', jobBrief.getJobById);
router.post('/postJob', jobBrief.postJob);
router.put('/putJob/:id', jobBrief.putJob);

module.exports = router;