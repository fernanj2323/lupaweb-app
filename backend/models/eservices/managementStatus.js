const mongoose = require('mongoose');
const { Schema } = mongoose;

const managementStatusSchema = new Schema ({
    name: {type: String},
})

module.exports = mongoose.model('managementStatus', managementStatusSchema);