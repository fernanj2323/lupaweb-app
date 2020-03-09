const Deparment = require('../models/departments');

const departmentsCtrl = {};

departmentsCtrl.getDeparments = async (req, res) => {
	const departments = await Deparment.find()
	res.json(departments);
}

departmentsCtrl.createDepartment = async (req, res) => {
	const department = new Deparment ({
		name: req.body.name,
	});
	await department.save();
	res.json({status: 'Línea de servicio creada'});
}

departmentsCtrl.getDepartment = async (req, res) => {
	const department = await Deparment.findById(req.params.id);
	res.json(department);
}

departmentsCtrl.editDepartment = async (req, res) => {
	const { id } = req.params;
	const department = {
		name: req.body.name,
	};
	console.log(req.params);
	await Deparment.findByIdAndUpdate(id, {$set: department});
	
		res.json({status: 'Línea de servicio actualizada'});
}

departmentsCtrl.deleteDepartment = async (req, res) => {
	await Deparment.findByIdAndRemove(req.params.id);
	res.json({status: 'Línea de servicio eliminada'})
}

module.exports = departmentsCtrl;