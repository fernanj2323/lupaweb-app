const Client = require('../models/client');
const clientCtrl = {};

clientCtrl.getClients = async (req,res) => {
    const clients = await Client.find()
    res.json(clients);

}

clientCtrl.createClient = async (req, res) => {

	console.log('2333333333333333333333333', req.body.name)
	const Cl =  new Client ({
		name: req.body.name
    });
    
	await Cl.save();
	res.json({status: 'Cliente creado'});
}


clientCtrl.getClient = async (req, res) => {
	const Client = await Client.findById(req.params.id);
	res.json(Client);
}

clientCtrl.editClient = async (req, res) => {
	//  res.json({
	// 	 status: 'Client Actualizado1',
	// 	name:  req.body.name,
	// 	id: req.params.id
	// });
	const  id  = req.params.id;
	const client = req.body; 

    await Client.findByIdAndUpdate(id, {$set: client},{new: true});
    
	res.json({status: 'Client Actualizado'});
}

clientCtrl.deleteClient = async (req, res) => {
	await Client.findByIdAndRemove(req.params.id);
	res.json({status: 'Cliente Eliminado'});
}

module.exports = clientCtrl;