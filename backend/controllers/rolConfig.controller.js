const RolConfig = require('../models/rolConfig');

const rolConfigCtrl = {};

rolConfigCtrl.getRolConfigs = async (req, res) => {
	const rolConfig = await RolConfig.find()
	res.json(rolConfig);
}

//Metodo para guardar datos embebidos
rolConfigCtrl.createRolConfig = async (req, res) => {
	const rolConfig = new RolConfig ({
		name: req.body.name,
		typeRol: req.body.typeRol,
		menulink: req.body.menulink,
		relmenu: req.body.relmenu,
		submenu: [{
			name: req.body.sbname,
			sblink: req.body.sblink,
			status: req.body.sbstatus
		}],
	});
	await rolConfig.save();
	res.json({status: 'Rol creado'});
}

rolConfigCtrl.getRolConfig = async (req, res) => {
	const rolConfig = await RolConfig.findById(req.params.id);
	res.json(rolConfig);
}

rolConfigCtrl.getRolsbyType = async (req, res) => {
	console.log(req);
	const id = req;
	const rolConfig = await RolConfig.find ({typeRol: id});
	console.log(rolConfig);
	res.json(rolConfig);
}

rolConfigCtrl.editRolConfig = async (req, res) => {
	const { id } = req.params;
	const rolConfig = {
		name: req.body.name,
		typeRol: req.body.typeRol,
		submenu: req.body.submenu
	};
	console.log(req.params);
	await RolConfig.findByIdAndUpdate(id, {$set: rolConfig},
		res.json({status: 'Rol actualizado'}));
}

rolConfigCtrl.deleteRolConfig = async (req, res) => {
	await RolConfig.findByIdAndRemove(req.params.id);
	res.json({status: 'Rol eliminado'})
}

module.exports = rolConfigCtrl;