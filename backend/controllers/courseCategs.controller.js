const CourseCateg = require('../models/courseCateg');

const courseCategsCtrl = {};

courseCategsCtrl.getCourseCategs = async (req, res) => {
	const courseCategs = await CourseCateg.find()
	res.json(courseCategs);
}

 courseCategsCtrl.createCourseCateg = async (req, res) => {
     const courseCateg = new CourseCateg({
		 name: req.body.name,
	 });
     await courseCateg.save();
     res.json({status: 'Course category created'});
 };


courseCategsCtrl.getCourseCateg = async (req, res) => {
	const courseCateg = await CourseCateg.findById(req.params.id);
	res.json(courseCateg);
}

courseCategsCtrl.editCourseCateg = async (req, res) => {
	console.log("editando categoria")
	const { id } = req.params;
	const courseCateg = {
		name: req.body.name,	
	};
	console.log(req.params);
	await CourseCateg.findByIdAndUpdate(id, {$set: courseCateg}, {new: true});
	res.json({status: 'Course category updated'});
}

courseCategsCtrl.deleteCourseCateg = async (req, res) => {
	await CourseCateg.findByIdAndRemove(req.params.id);
	res.json({status: 'Course category removed'});
}

module.exports = courseCategsCtrl;