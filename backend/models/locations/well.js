const mongoose = require('mongoose');
const { Schema } = mongoose;

const wellSchema = new Schema ({
    name: {type: String},
    newWell: {type: String},
    closter: {type: String},
    camp: {type: String},
    district: {type: String},
    country: {type: String},
})

module.exports = mongoose.model('Well', wellSchema);