const eLearningModule = require('../models/eLearningModule');
const eLearningSubModule = require('../models/eLearningSubModule');
const eLearningModelCtrl = {};

eLearningModelCtrl.getLearningModules = async (req, res) => {

	const eLearningModules = await eLearningModule.find()
	res.json(eLearningModules);
}

eLearningModelCtrl.getModuleByCourse_id = async (req, res) => {
	const {id}  = req.params;
    modules = await eLearningModule.find({ 
	 	course_id: id
	 });
	 res.json(modules);
}

eLearningModelCtrl.createLearningModule = async (req, res) => {
     const eLearningmodule = new eLearningModule({
		 title: req.body.title,
		 course_id: req.body.course_id 
	 });
     await eLearningmodule.save();
     res.json({status: 'Learning module created'});
 };

eLearningModelCtrl.getLearningModule = async (req, res) => {
	const eLearningmodule = await eLearningModule.findById(req.params.id);
	res.json(eLearningmodule);
}

eLearningModelCtrl.editModel = async (req, res) => {
	const { id } = req.params;
	const module = {
		title: req.body.title,
		course_id: req.body.course_id
	};
	await eLearningModule.findByIdAndUpdate(id, {$set: module}, {new: true});
	res.json({status: 'Module Updated'});
}

eLearningModelCtrl.deleteModule = async (req, res) => {
	await eLearningModule.findByIdAndRemove(req.params.id);
	res.json({status: 'Learning module Removed'});
}

module.exports = eLearningModelCtrl;