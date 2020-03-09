const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema ({
    name: { type: String}
}); 

module.exports = mongoose.model('Client', clientSchema);