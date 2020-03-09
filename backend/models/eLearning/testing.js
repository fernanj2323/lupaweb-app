const mongoose = require('mongoose');
const { Schema } = mongoose;


const testingSchema = new Schema({
    question_id: { type: String },
    answer_id: { type: String },
    user_id_rel:  { type: String },
    course_id:  { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course' },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' },
    course_id_rel: { type: String },
    answer_status: { type: String },
    token_session: { type: String },
    attempt: { type: Number },
    updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Testing', testingSchema);