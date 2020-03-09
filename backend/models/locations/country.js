const mongoose = require('mongoose');
const { Schema } = mongoose;

const countrySchema = new Schema ({
    name: {type: String},
    newCountry: {type: String}
})

module.exports = mongoose.model('Country', countrySchema);