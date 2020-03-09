const mongoose = require('mongoose');
const { Schema } = mongoose;


const departmentSchema = new Schema({
    name: { type: String }
});

module.exports = mongoose.model('Department', departmentSchema);