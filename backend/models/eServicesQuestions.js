const mongoose = require('mongoose');
const { Schema } = mongoose; 


const eServicesQuestionsSchema = new Schema({
    id:{type:String}, //id o numero de pregunta 
    text:{type:String},//texto que indica la pregunta
    phase:{type:String}
})



module.exports = mongoose.model('eServicesQuestions', eServicesQuestionsSchema);