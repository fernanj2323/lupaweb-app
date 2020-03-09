const mongoose = require('mongoose');
const { Schema } = mongoose;


const eLearningModuleSchema = new Schema({
    title: { type: String },
    updated: { type: Date, default: Date.now },
    course_id:  { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course' }
});

module.exports = mongoose.model('eLearningModule', eLearningModuleSchema);