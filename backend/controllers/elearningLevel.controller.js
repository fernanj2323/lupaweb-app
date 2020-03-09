const eLearningLevel = require('../models/eLearningLevel');

const eLearningLevelCtrl = {};

eLearningLevelCtrl.geteLearningLevels = async (req, res) => {
	const eLearningLevels = await eLearningLevel.find()
	res.json(eLearningLevels);
}

 eLearningLevelCtrl.createeLearningLevel = async (req, res) => {
     const eLearningLevels = new eLearningLevel({
		 name: req.body.name,
	 });
	 await eLearningLevels.save();
     res.json({status: 'eLearningLevel created'});
 };


eLearningLevelCtrl.geteLearningLevel = async (req, res) => {
	const eLearningLevels = await eLearningLevel.findById(req.params.id);
	res.json(eLearningLevels);
}

eLearningLevelCtrl.editeLearningLevel = async (req, res) => {
	const { id } = req.params;
	const eLearningLevels = {
		name: req.body.name,		
	};
	console.log(req.params);
	await eLearningLevel.findByIdAndUpdate(id, {$set: eLearningLevels}, {new: true});
	res.json({status: 'eLearningLevel Updated'});
}

eLearningLevelCtrl.deleteeLearningLevel = async (req, res) => {
	await eLearningLevel.findByIdAndRemove(req.params.id);
	res.json({status: 'eLearningLevel Removed'});
}

module.exports = eLearningLevelCtrl;