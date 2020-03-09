const questionsAws = require('../../models/eLearning/questions');
const questionsAwsCtrl = {};


questionsAwsCtrl.getQuestions = async (req, res) => {
    const questions = await questionsAws.find();
    res.json(questions);
}

questionsAwsCtrl.getQuestionsByCourseId = async (req, res) => {
    const id = req.params.id;
    questions = await questionsAws.find({ 
        course_id: id,
        //{ $elemMatch: { $gte: 80, $lt: 85 } }
        //'answers.name':  { $nin: 'vacio' } 
     });
    res.json(questions);
}

questionsAwsCtrl.createQuestion = async (req, res) =>{
    //Se almacenan las respuestas asociadas a la pregunta
    const array = ({
            name: req.body.name,
            user_id: req.body.user_id,
            course_id: req.body.course_id,
            answers:[{
                name: req.body.q1a1name,
                status: req.body.q1a1aprobation,
            },
            {
                name: req.body.q1a2name,
                status: req.body.q1a2aprobation,                
            },
            {
                name: req.body.q1a3name,
                status: req.body.q1a3aprobation,          
            },
            {
                name: req.body.q1a4name,
                status: req.body.q1a4aprobation,                
            },
            {
                name: req.body.q1a5name,
                status: req.body.q1a5aprobation,                
            }            
        ],
    });
    const question = new questionsAws(array)
    await question.save();
    res.json("questions and aswer created");
}


questionsAwsCtrl.editQuestion = async (req, res) =>{

    const id = req.params.id;
    const question  = req.body;

    questionUpdated = await questionsAws.findByIdAndUpdate(id, {$set: question}, {new: true});

    res.json({
        status: 'updated',
        questionUpdated: questionUpdated
    })
}

module.exports = questionsAwsCtrl;