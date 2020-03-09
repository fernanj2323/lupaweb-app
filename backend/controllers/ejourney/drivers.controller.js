const Driver = require ('../../models/ejourney/driver');
const driverCtrl = {};

driverCtrl.getDrivers = async (req, res, next) => {
    const drivers = await Driver.find().populate({path: 'user'}).sort({'_id': -1});
    res.json(drivers);
};

driverCtrl.createDriver = async (req, res, next) => {
    const driver = new Driver({
        user: req.body.user,
        status: 1
    });
    await driver.save((err,driver) => {
        if (err) {
            res.status(500).send({status: 'Error en el servidor'});
        } else {
            if (!driver) {
                res.status(404).send({status: 'Error al guardar'});
            } else {
                res.status(200).send({driver});
            }
        }
    });
};

driverCtrl.getDriver = async (req, res, next) => {
    const { id } = req.params;
    await Driver.findById(id).populate({path: 'user'}).exec((err,driver) => {
        if (err) {
            res.status(404).send({status: 'Registro no existe'});
        } else {
            res.status(200).send(driver);
        }
    });
};

driverCtrl.editDriver = async (req, res, next) => {
    const { id } = req.params;
    const driver = {
        user: req.body.user,
        status: req.body.status,
    };
    await Driver.findByIdAndUpdate(id, {$set: driver}, {new: true});
    res.json({status: 'Driver Updated'});
};

driverCtrl.deleteDriver = async (req, res, next) => {
    await Driver.findByIdAndRemove(req.params.id);
    res.json({status: 'Driver Deleted'});
};

module.exports = driverCtrl;