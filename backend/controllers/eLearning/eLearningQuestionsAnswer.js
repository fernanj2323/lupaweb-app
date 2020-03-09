const ELearningQuestionsAnswers = require ('../../models/eLearning/ELearningQuestionsAnswers');
const questionsAnswerCtrl = {}; 


questionsAnswerCtrl.getQuestionsByCourseId = async (req, res) => {
const id = req.params.id;
questons = await ELearningQuestionsAnswers.find({
    course_id: id
})

res.json(questions);
}

questionsAnswerCtrl.createQuestion = async (req, res) =>{
    console.log("Estoy en el modelo");
    console.log(req.body);
const question = new ELearningQuestionsAnswers(req.body)

await question.save();

res.json("questions and aswer created");
}


questionsAnswerCtrl.editQuestion = async (req, res) =>{

    const id = req.params.id;
    const question  = req.body;

    questionUpdated = await ELearningQuestionsAnswers.findByIdAndUpdate(id, {$set: question}, {new: true});

    res.json({
        status: 'updated',
        questionUpdated: questionUpdated
    })
}

module.exports = questionsAnswerCtrl;