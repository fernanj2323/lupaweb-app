const express = require('express');
const router = express.Router();

const journey = require('../../controllers/ejourney/journeys.controller');

router.get('/', journey.getJourneys);
router.post('/', journey.createJourney);
router.get('/:id', journey.getJourney);
router.put('/:id', journey.editJourney);
router.delete('/:id', journey.deleteJourney);

module.exports = router;