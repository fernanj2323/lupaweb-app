const express = require('express');
const router = express.Router();
const homeCard = require('../../controllers/eservices/homeCard.controller')


router.post('/getCardByUserAndType', homeCard.getCardByUserAndType)
router.post('/postCard', homeCard.postCard)
router.put('/putCard/:id', homeCard.putCard)



module.exports = router;