const express = require('express');
const router = express.Router();
const locations = require('../controllers/locations.controller');
// const countrys = require('../controllers/locations/countyrs.controller');


// ---------------------------- //
//countrys 
router.get('/countrys',locations.getCountrys );
router.post('/countrys', locations.createCountry);
router.put('/countrys/:id', locations.editCountry);
//Districts 
router.get('/districts',locations.getDistricts );
router.post('/districts', locations.createDistrict);
router.post('/districts/getDistrictsByCountry', locations.getDistrictsByCountry);
router.put('/districts/:id', locations.editDistrict)

//Camps
router.get('/camps',locations.getCamps );
router.post('/camps', locations.createCamp);
router.put('/camps/:id', locations.editCamp);
//Closters
router.get('/closters',locations.getClosters );
router.post('/closters', locations.createCloster);
router.put('/closters/:id', locations.editCloster);
//Wells
router.get('/wells',locations.getWells );
router.post('/wells', locations.createWell);
router.put('/wells/:id', locations.editWell);
// ---------------------------- ///

router.get('/',locations.getLocations);
router.post('/', locations.createLocation);
router.get('/:id',locations.getLocation);
router.put('/:id', locations.editLocation);
router.delete('/:id', locations.deleteLocation);

module.exports = router;