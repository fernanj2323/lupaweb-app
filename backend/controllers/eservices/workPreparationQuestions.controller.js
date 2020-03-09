const workPreparationQuestions = require ('../../models/eservices/workPreparationQuestions')
const workPreparationQuestionsCtrl = {};

workPreparationQuestionsCtrl.createQuestion = async (req, res)=> {
    const question = new workPreparationQuestions(req.body)  

    await question.save();

    res.json({
        question: question, 
        status: 'question saved'
    })
}

workPreparationQuestionsCtrl.getQuestions = async (req, res)=> 
{
    const questions = await workPreparationQuestions.find()
    res.json(questions); 
}

workPreparationQuestionsCtrl.getQuestionsByServiceLine = async (req, res)=> 
{
    console.log('----------------getQuestionsByServiceLine------------------');
  
    const serviceLine = req.body; 

    console.log(serviceLine); 


    if(req.body.sl ==1){
        const questions = await workPreparationQuestions.find({
            sl: req.body.sl
        })
        res.json(questions); 
    }
    if(req.body.ct == 1){
        const questions = await workPreparationQuestions.find({
            ct: req.body.ct
        })
        res.json(questions); 
    }
    if (req.body.wl == 1){

        // console.log('wlll')
        const questions = await workPreparationQuestions.find({
            wl: req.body.wl
        })
        res.json(questions); 
    }
    if (req.body.fi == 1){
        const questions = await workPreparationQuestions.find({
            fi: req.body.fi
        });
        res.json(questions); 
    }
    if(req.body.wt == 1){
        const questions = await workPreparationQuestions.find({
            wt: req.body.wt
        })
        res.json(questions); 
    }

   
  

   
}

module.exports = workPreparationQuestionsCtrl