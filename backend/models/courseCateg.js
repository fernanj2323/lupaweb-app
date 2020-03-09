const mongoose = require('mongoose');
const { Schema } = mongoose;


const courseCategSchema = new Schema({
    name: { type: String },
});

module.exports = mongoose.model('CourseCateg', courseCategSchema);