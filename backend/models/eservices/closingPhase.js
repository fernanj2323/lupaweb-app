const mongoose = require('mongoose');
const { Schema } = mongoose;


const closingSch = new Schema 
({
    autorId:{type:String},
    managementId:{type:String},
    aprovatorId:{type:String},
    KPIcalification:{type:Number},
    NPThours:{type:Number},
    NPThoursLupaCard:{type:Number},
    NPTvalue:{type:Number},
    ticketValue:{type:Number},
    clientComments:{type:String},
    clientCommentsLupaCard:{type:Number},


});

module.exports = mongoose.model ('closingPhase', closingSch);
