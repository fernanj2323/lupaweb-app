const mongoose = require('mongoose');
const { Schema } = mongoose;


const lectionsSchema = new Schema 
 ({
    title:{type:String},
    justification:{type:String},
    finallyStatus:{type:String},
    managementId:{type:String},

    perosnalCompetences1:{type:String},
    toolsAndMan1:{type:String},
    process1:{type:String},
    inspection1:{type:String},
    tools1:{type:String},
    others1:{type:String},

    perosnalCompetences2:{type:String},
    toolsAndMan2:{type:String},
    process2:{type:String},
    inspection2:{type:String},
    tools2:{type:String},
    others2:{type:String},
    
});

module.exports = mongoose.model ('lections', lectionsSchema)