const mongoose = require('mongoose');
const { Schema } = mongoose; 

const technologyConditionSchema = new Schema({
    title: {type: String}, 
    wt:{type: Boolean},
    wl:{type: Boolean},
    sl:{type: Boolean},
    ct:{type: Boolean},
    fi:{type: Boolean}, //frente de inyeccion 
    justification: {type: String},
})

module.exports = mongoose.model('technologyCondition', technologyConditionSchema);