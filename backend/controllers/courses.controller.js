const Course = require('../models/course');

const coursesCtrl = {};

coursesCtrl.getCourses = async (req, res) => {
	const courses = await Course.find()
	res.json(courses);
}

 coursesCtrl.createCourse = async (req, res) => {
     const course = new Course({
		 title: req.body.title,
		 department_id: req.body.department_id,
		 description: req.body.description,
		 requirements: req.body.requirements,
		 owner_id: req.body.owner_id,
		 profile: req.body.profile,
		 status: req.body.status,
		 user_id: req.body.user_id,
		 created: req.body.created,
		 valid_days: req.body.valid_days,
		 valid_month: req.body.valid_month,
		 valid_years: req.body.valid_years,
		 online: req.body.online,
		 url_src: req.body.url_src,
		 dateini: req.body.dateini,
		 dateclose: req.body.dateclose,
		 url_video: req.body.url_video,
		 category_id: req.body.category_id,
		 teacher_id: req.body.teacher_id,
		 contact: req.body.contact,
		 course_time: req.body.time
	 });
     await course.save();
     res.json({status: 'Course created'});
 };


coursesCtrl.getCourse = async (req, res) => {
	const course = await Course.findById(req.params.id);
	res.json(course);
}

coursesCtrl.editCourse = async (req, res) => {
	const { id } = req.params;
	const course = {
		title: req.body.title,
		department_id: req.body.department_id,
		description: req.body.description,
		requirements: req.body.requirements,
		owner_id: req.body.owner_id,
		profile: req.body.profile,
		status: req.body.status,
		user_id: req.body.user_id,
		created: req.body.created,
		valid_days: req.body.valid_days,
		valid_month: req.body.valid_month,
		valid_years: req.body.valid_years,
		online: req.body.online,
		url_src: req.body.url_src,
		dateini: req.body.dateini,
		dateclose: req.body.dateclose,
		url_video: req.body.url_video,
		category_id: req.body.category_id,
		teacher_id: req.body.teacher_id,
		contact: req.body.contact,
		course_time: req.body.time	
	};
	console.log(req.params);
	await Course.findByIdAndUpdate(id, {$set: course}, {new: true});
	res.json({status: 'Course Updated'});
}

coursesCtrl.deleteCourse = async (req, res) => {
	await Course.findByIdAndRemove(req.params.id);
	res.json({status: 'Course Removed'});
}

module.exports = coursesCtrl;