const eLearningSubModule = require('../models/eLearningSubModule');

const subModelCtrl = {};

subModelCtrl.getSubModules = async (req, res) => {
	const subModules = await eLearningSubModule.find()
	res.json(subModules);
}

 subModelCtrl.createSubModule = async (req, res) => {
	 console.log(req);
     const subModule = new eLearningSubModule({
         title: req.body.title,
         description: req.body.description,
         video_url: req.body.video_url,
         pdf_url: req.body.pdf_url,
         ppt_url: req.body.ppt_url,
         module: req.body.module   
	 });
     await subModule.save();
     res.json({status: 'Learning module created'});
 };

subModelCtrl.getSubModule = async (req, res) => {
	const subModule = await eLearningSubModule.findById(req.params.id);
	res.json(subModule);
}

subModelCtrl.getSubModuleBymodule = async (req, res) => {	
	const subModule = await eLearningSubModule.find({ module:req.params.id });
	res.json(subModule);
}

subModelCtrl.getSubModuleByModuleFirst = async (req, res) => {	
	const subModule = await eLearningSubModule.findOne({ module:req.params.id });
	res.json(subModule);
}

subModelCtrl.editSubModule = async (req, res) => {
	const { id } = req.params;
	const subModule = {
		title: req.body.title,
        description: req.body.description,
        video_url: req.body.video_url,
        pdf_url: req.body.pdf_url,
        ppt_url: req.body.ppt_url,
        module: req.body.module
	};
	await eLearningSubModule.findByIdAndUpdate(id, {$set: subModule}, {new: true});
	res.json({status: 'Learning module updated'});
}

subModelCtrl.deleteSubModule = async (req, res) => {
	await eLearningSubModule.findByIdAndRemove(req.params.id);
	res.json({status: 'Learning module Removed'});
}

module.exports = subModelCtrl;