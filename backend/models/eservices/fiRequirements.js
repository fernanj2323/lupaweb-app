const mongoose = require('mongoose');
const { Schema } = mongoose;

const fiRequirementsSchema = new Schema 
 ({
  

    chiksanHosesN:{type:String},
    chiksanHosesO:{type:String},
    
    
    simpleChiksanN:{type:String},
    simpleChiksanO:{type:String},
    
    dobleChiksanN:{type:String},
    dobleChiksanO:{type:String},
    
    y2N:{type:String},
    y2O:{type:String}, 
    
    t2N:{type:String},
    t2O:{type:String},
    
    valves2N:{type:String},
    valves2O:{type:String},
    
    valves1N:{type:String},
    valves1O:{type:String},
    
    unionKitN:{type:String},
    unionKitO:{type:String},
    
    flapperN:{type:String},
    flapperO:{type:String},
    
    nutN:{type:String},
    nutO:{type:String},
    
    pinN:{type:String},
    pinO:{type:String},
    
    elbowsN:{type:String},
    elbowsO:{type:String},
    
    pipes6N:{type:String},
    pipes6O:{type:String}, 
    
    pipes8N:{type:String},
    pipes8O:{type:String},
    
    toysN:{type:String},
    toysO:{type:String},
    
    
    bottleN:{type:String},
    bottleO:{type:String},
    
    securityGN:{type:String},
    securityGO:{type:String}, 
    
    manifoldN:{type:String},
    manifoldO:{type:String},
    
    bottle150N:{type:String},
    bottle150O:{type:String},
    
    valveN:{type:String}, 
    valveO:{type:String},
    
    pipe3x10N:{type:String}, 
    pipe3x10O:{type:String},
    
    pipe3x20N:{type:String},
    pipe3x20O:{type:String},
    
    elbows1000psiN:{type:String},
    elbows1000psiO:{type:String},
    hose500PSIN:{type:String},
    hose500PSIO:{type:String},
    
    manometerN:{type:String},
    manometerO:{type:String},
    
    
workPreparationId:{type:String},
userId:{type:String},

})
module.exports = mongoose.model ('fiRequirements', fiRequirementsSchema)
