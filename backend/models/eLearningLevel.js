const mongoose = require('mongoose');
const { Schema } = mongoose;


const eLearningLevelSchema = new Schema({
    name: { type: String },
});

module.exports = mongoose.model('eLearningLevel', eLearningLevelSchema);