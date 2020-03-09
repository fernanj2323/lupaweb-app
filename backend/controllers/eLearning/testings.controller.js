const testing = require('../../models/eLearning/testing');
const testingsCtrl = {};

testingsCtrl.getTesting = async (req, res) => {
    const testings = await testing.find();
    res.json(testings);
}

testingsCtrl.getTestingByCourseId = async (req, res) => {
    const id = req.params.id;
    testings = await testing.find({ course_id: id });
    res.json(testings);
}

testingsCtrl.getTestingByCourseUser = async (req, res) => {
    const id = req.params.id;
    const user_id = req.params.user_id;
    console.log(id);

    testing.aggregate([
        { "$match": { "course_id_rel": id, "user_id": user_id } },
        {
            "$group": {
                "_id": "$token_session",
                'token_session': {$first: "$token_session"},
                'intento': {$first: "$attempt"},
            }
        },     
    ]).exec((err, testing) => {
        if (err) throw err;
        console.log(testing);
        res.json(testing);
    });
}

testingsCtrl.getTestingByToken = async (req, res) => {
    const id = req.params.id;

    testing.aggregate([
        { "$match": { "token_session": id } },
        {
            "$group": {
                "_id": "$token_session",
                'token_session': {$first: "$token_session"},
            }
        },     
    ]).exec((err, testing) => {
        if (err) throw err;
        console.log(testing);
        res.json(testing);
    });    
}

testingsCtrl.getTotalGood = async (req, res) => {
    const id = req.params.id;
    const user_id = req.params.user_id;
    const token = req.params.token;
    
    results = await testing.find({ 
        course_id: id, 
        user_id: user_id,
        token_session: token,
        answer_status: 'true' });
    res.json(results);
}

testingsCtrl.getTotalAnsw = async (req, res) => {
    const id = req.params.id;
    const user_id = req.params.user_id;
    const token = req.params.token;
    
    results = await testing.find({ 
        course_id: id, 
        user_id: user_id,
        token_session: token, });
    res.json(results);
}

testingsCtrl.createTesting = async (req, res) =>{
    //Se almacenan las respuestas asociadas a la pregunta
    const array = ({
            question_id: req.body.question_id,
            answer_id: req.body.answer_id,
            course_id: req.body.course_id,
            course_id_rel: req.body.course_id,
            user_id: req.body.user_id,
            user_id_rel: req.body.user_id,
            answer_status: req.body.answer_status,
            token_session: req.body.token_session,
            attempt: req.body.attempt
    });
    const testings = new testing(array)
    await testings.save();
    res.json("testing created");
}


testingsCtrl.editTesting = async (req, res) =>{
    const id = req.params.id;
    const answer  = req.body;

    questionUpdated = await questionsAws.findByIdAndUpdate(id, {$set: answer}, {new: true});
    res.json({
        status: 'updated',
        testingUpdated: testingUpdated
    })
}

module.exports = testingsCtrl;