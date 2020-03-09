const express = require('express');
const router = express.Router();
const profile = require ('../../controllers/users/profile.controller');

router.get ('/', profile.getProfiles);
router.post('/getProfileByEmail', profile.getProfileByEmail);
router.post('/getProfileByAuthId', profile.getProfileByAuthId);
router.post('/getProfileById', profile.getProfileById);
router.put('/editProfile/:id', profile.editProfile);

module.exports = router;