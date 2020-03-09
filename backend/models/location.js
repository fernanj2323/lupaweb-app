const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema ({
    name: {type: String},
    newLocation: {type: String}
})

module.exports = mongoose.model('Location', locationSchema);