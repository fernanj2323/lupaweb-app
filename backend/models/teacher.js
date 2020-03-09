const mongoose = require('mongoose');
const { Schema } = mongoose;


const teacherSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    phone: { type: String },
    education_id: { type: String },
    profile: { type: String },
    title: { type: String },
});

module.exports = mongoose.model('Teacher', teacherSchema);