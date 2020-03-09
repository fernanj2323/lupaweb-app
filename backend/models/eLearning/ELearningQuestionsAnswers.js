const mongoose = require('mongoose');
const { Schema } = mongoose;

const eLearningQuestionsAnswersSchema = new Schema ({
    title: { type: String },
    course_id: { type: String },
    autorName: { type: String },
    created: { type: String },
    questions: {
        question:{
            answer1:{
                name:{type: String},
                aprobation:{ typle: Boolean}, 
            },
            answer2:{
                name:{type: String},
                aprobation:{ typle: Boolean}, 
            },
            answer3:{
                name:{type: String},
                aprobation:{ typle: Boolean}, 
            },
            answer4:{
                name:{type: String},
                aprobation:{ typle: Boolean}, 
            },
            answer5:{
                name:{type: String},
                aprobation:{ typle: Boolean}, 
            },
        },
    }
})


module.exports = mongoose.model('eLearningQuestionsAnswers', eLearningQuestionsAnswersSchema);

