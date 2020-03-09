const mongoose = require('mongoose');
const { Schema } = mongoose;

const districtSchema = new Schema ({
    name: {type: String},
    newDistrict: {type: String},
    country: {type: String},
})

module.exports = mongoose.model('District', districtSchema);