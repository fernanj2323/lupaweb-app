const mongoose = require('mongoose');
const { Schema } = mongoose;

const workPreparationQuestionsSchema = new Schema ({
    name: {type: String},
    wt : {type: Number},
    ct : {type: Number},
    fi : {type: Number},
    sl : {type: Number},
    wl : {type: Number}
})

module.exports = mongoose.model ('workPreparationQuestions', workPreparationQuestionsSchema)