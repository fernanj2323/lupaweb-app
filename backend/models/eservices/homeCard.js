const mongoose = require('mongoose');
const { Schema } = mongoose;

const homeCardSch = new Schema 
({
    userId:{type:String},
    color:{type:String},
    cardType:{type:Number},
});

module.exports = mongoose.model ('homeCard', homeCardSch);