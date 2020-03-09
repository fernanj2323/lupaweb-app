const mongoose = require('mongoose');
const { Schema } = mongoose;

const closterSchema = new Schema ({
    name: {type: String},
    newCloster: {type: String},
    camp: {type: String},
    district: {type: String},
    country: {type: String},
})

module.exports = mongoose.model('Closter', closterSchema);