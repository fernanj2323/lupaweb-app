const mongoose = require('mongoose');
const { Schema } = mongoose;

const campSchema = new Schema ({
    name: {type: String},
    newCamp: {type: String},
    district: {type: String},
    country: {type: String},
})

module.exports = mongoose.model('Camp', campSchema);