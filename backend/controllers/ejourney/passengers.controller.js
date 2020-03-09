const Passenger = require ('../../models/ejourney/passenger');
const passengerCtrl = {};

passengerCtrl.getPassengers = async (req, res, next) => {
    const passengers = await Passenger.find()
    .populate({
        path: 'user'
    });
    res.json(passengers);
};

passengerCtrl.createPassenger = async (req, res, next) => {
    const passenger = new Passenger({
        user: req.body.user,
    });
    await passenger.save((err,passenger) => {
        if (err) {
            res.status(500).send({status: 'Error en el servidor'});
        } else {
            if (!passenger) {
                res.status(404).send({status: 'Error al guardar'});
            } else {
                res.status(200).send({passenger});
            }
        }
    });
};

passengerCtrl.getPassenger = async (req, res, next) => {
    const { id } = req.params;
    await Passenger.findById(id).populate({path: 'user'}).exec((err,passenger) => {
        if (err) {
            res.status(404).send({status: 'Registro no existe'});
        } else {
            res.status(200).send({passenger});
        }
    });
};

passengerCtrl.editPassenger = async (req, res, next) => {
    const { id } = req.params;
    const passenger = {
        user: req.body.user,
    };
    await Passenger.findByIdAndUpdate(id, {$set: passenger}, {new: true});
    res.json({status: 'Passenger Updated'});
};

passengerCtrl.deletePassenger = async (req, res, next) => {
    await Passenger.findByIdAndRemove(req.params.id);
    res.json({status: 'Passenger Deleted'});
};

module.exports = passengerCtrl;