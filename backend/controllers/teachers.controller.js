const Teacher = require('../models/teacher');

const teachersCtrl = {};

teachersCtrl.getTeachers = async (req, res) => {
	const teachers = await Teacher.find()
	res.json(teachers);
}

 teachersCtrl.createTeacher = async (req, res) => {
     const teacher = new Teacher({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        education_id: req.body.education_id,
        profile: req.body.profile,
        title: req.body.title
	 });
     await teacher.save();
     res.json({status: 'Teacher created'});
 };


teachersCtrl.getTeacher = async (req, res) => {
	const teacher = await Teacher.findById(req.params.id);
	res.json(teacher);
}

teachersCtrl.editTeacher = async (req, res) => {
	const { id } = req.params;
	const teacher = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        education_id: req.body.education_id,
        profile: req.body.profile,
        title: req.body.title		
	};
	console.log(req.params);
	await Teacher.findByIdAndUpdate(id, {$set: teacher}, {new: true});
	res.json({status: 'Teacher Updated'});
}

teachersCtrl.deleteTeacher = async (req, res) => {
	await Teacher.findByIdAndRemove(req.params.id);
	res.json({status: 'Teacher Removed'});
}

module.exports = teachersCtrl;