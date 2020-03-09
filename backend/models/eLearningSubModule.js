const mongoose = require('mongoose');
const { Schema } = mongoose;


const eLearningSubModuleSchema = new Schema({
    title: { type: String },
    description: { type: String },
    video_url: { type: String },
    pdf_url: { type: String },
    ppt_url: { type: String },
    module:  { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'eLearningModule' },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('eLearningSubModule', eLearningSubModuleSchema);