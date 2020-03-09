const Vehicle = require ('../../models/ejourney/vehicle');
const vehicleCtrl = {};

vehicleCtrl.getVehicles = async (req, res, next) => {
    const vehicles = await Vehicle.find().sort({'_id': -1});
    res.json(vehicles);
};

vehicleCtrl.createVehicle = async (req, res, next) => {
    const vehicle = new Vehicle({
        brand: req.body.brand,
        model: req.body.model,
        status: 1,
        type: req.body.type,
        plate: req.body.plate
    });
    await vehicle.save();
    res.json({status: 'Vehicle created'});
};

vehicleCtrl.getVehicle = async (req, res, next) => {
    const { id } = req.params;    
    await Vehicle.findById(id).exec((err,vehicle) => {
        if (err) {
            res.status(404).send({status: 'Registro no existe'});
        } else {
            res.status(200).send(vehicle);
        }
    });
};

vehicleCtrl.editVehicle = async (req, res, next) => {
    const { id } = req.params;
    const vehicle = {
        brand: req.body.brand,
        model: req.body.model,
        status: req.body.status,
        plate: req.body.plate,
        type: req.body.type,
    };
    await Vehicle.findByIdAndUpdate(id, {$set: vehicle}, {new: true});
    res.json({status: 'Vehicle Updated'});
};

vehicleCtrl.deleteVehicle = async (req, res, next) => {
    await Vehicle.findByIdAndRemove(req.params.id);
    res.json({status: 'Vehicle Deleted'});
};

module.exports = vehicleCtrl;