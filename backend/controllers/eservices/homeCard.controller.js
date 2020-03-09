const homeCard = require ('../../models/eservices/homeCard')
const homeCardCRL = {};


homeCardCRL.postCard  = async (req, res) =>{
card =  new homeCard (req.body);
await card.save();
res.json({
    status: 'card created'
})

}

homeCardCRL.putCard = async (req, res) =>{
id = req.params.id; 
card = req.body; 

await homeCard.findByIdAndUpdate(id, {$set: card});
res.json('card updated');

}

homeCardCRL.getCardByUserAndType = async (req, res) =>{
//console.log('getCardByUserAndType' , req.body);
const array = req.body; 

const cards = await homeCard.find({
    userId:array.userId, 
    cardType:array.cardType 
})

//console.log(cards);
res.json(cards);

}

module.exports = homeCardCRL;