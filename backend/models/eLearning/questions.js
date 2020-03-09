const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnswersSchema = new Schema({
    name: { type: String },
    status: { type: String, 
              //required: "Es requerida una respuesta por pregunta",
              //enum: ["Verdadera", "Falso"]
            },
    updated: { type: Date, default: Date.now },
});


var QuestionsSchema = new Schema({
    name: { type: String },
    user_id:  { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' },
    course_id:  { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course' },    
    updated: { type: Date, default: Date.now },
    answers: [AnswersSchema]
});

module.exports = mongoose.model('Questions', QuestionsSchema);