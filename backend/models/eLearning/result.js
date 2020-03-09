const mongoose = require('mongoose');
const { Schema } = mongoose;


const resultSchema = new Schema({
    awsgood: { type: Number },
    awsbad: { type: Number },
    course_id: { type: String },
    user_id: { type: String },
    updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Result', resultSchema);