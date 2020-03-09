const Journey = require ('../../models/ejourney/journey');
const journeyCtrl = {};

journeyCtrl.getJourneys = async (req, res, next) => {
    const journeys = await Journey.find().populate('user').sort({'_id': -1});
    res.json(journeys);
};

journeyCtrl.createJourney = async (req, res, next) => {
    const journey = new Journey({
        user: req.body.user,
        title: req.body.title,
        comments: req.body.comments,
        status: 'ABIERTO',
        jdate: req.body.jdate,
        journeyQuestion: req.body.journeyQuestion,
        department: req.body.department,
        journeyReason: req.body.journeyReason,
        vehicleType: req.body.vehicleType,
        origin: req.body.origin,
        destiny: req.body.destiny,
        departureTime: req.body.departureTime,
        checkIn: req.body.checkIn,
        checkInReal: req.body.checkInReal,
        estimatedDistance: req.body.estimatedDistance,
        vialSecurityPolitics: req.body.vialSecurityPolitics,
        vehicles: [],
        drivers: [],
        passengers: [],
        dangerousMercancy: [],
        riskResultA: null, riskResultB: null, riskResultC: null, 
        riskResultD: null, riskResultE: null, riskResultF: null, 
        riskResultG: null, riskResultH: null, riskResultI: null, 
        riskResultJ: null, riskResultK: null, riskResultTotals: null, 
        wheatherState: null, roadCondition: null, publicRisk: null,
        travelTime: null, breakTime: null, electricLines: null, obstaclesOnTrack: null,
        tripPlans: [], convoyLeaderStatus: null, chiefDistrictStatus: null, operationsManagerStatus: null,
        generalManagerStatus: null, hseqSupervisorStatus: null, hrsEstTotals: '00:00'
    });
    await journey.save((err,journey) => {
        if (err) {
            res.status(500).send({status: 'Error en el servidor'});
        } else {
            if (!journey) {
                res.status(404).send({status: 'Error al guardar'});
            } else {
                res.status(200).send({journey});
            }
        }
    });
};

journeyCtrl.getJourney = async (req, res, next) => {
    const { id } = req.params;
    await Journey.findById(id)
    .populate('user')
    .populate('vehicles.vehicle')
    .populate('drivers.driver')
    .exec((err,journey) => {
        if (err) {
            res.status(404).send({status: 'Registro no existe'});
        } else {
            res.status(200).send(journey);
        }
    });
};

journeyCtrl.editJourney = async (req, res, next) => {
    const { id } = req.params;
    const journey = {
        user: req.body.user,
        title: req.body.title,
        comments: req.body.comments,
        vehicles: req.body.vehicles,
        drivers: req.body.drivers,
        passengers: req.body.passengers,
        dangerousMercancy: req.body.dangerousMercancy,
        status: req.body.status,
        jdate: req.body.jdate,
        journeyQuestion: req.body.journeyQuestion,
        department: req.body.department,
        journeyReason: req.body.journeyReason,
        vehicleType: req.body.vehicleType,
        origin: req.body.origin,
        destiny: req.body.destiny,
        departureTime: req.body.departureTime,
        checkIn: req.body.checkIn,
        checkInReal: req.body.checkInReal,
        estimatedDistance: req.body.estimatedDistance,
        vialSecurityPolitics: req.body.vialSecurityPolitics,
        driversInspection: req.body.driversInspection,
        vehiclesConditions: req.body.vehiclesConditions,
        vehiclesMonitoring: req.body.vehiclesMonitoring,
        riskResultA: req.body.riskResultA, riskResultB: req.body.riskResultB, riskResultC: req.body.riskResultC,
        riskResultD: req.body.riskResultD, riskResultE: req.body.riskResultE, riskResultF: req.body.riskResultF,
        riskResultG: req.body.riskResultG, riskResultH: req.body.riskResultH, riskResultI: req.body.riskResultI,
        riskResultJ: req.body.riskResultJ, riskResultK: req.body.riskResultK, riskResultTotals: req.body.riskResultTotals,
        wheatherState: req.body.wheatherState, roadCondition: req.body.roadCondition, publicRisk: req.body.publicRisk,
        travelTime: req.body.travelTime, breakTime: req.body.breakTime, electricLines: req.body.electricLines,
        obstaclesOnTrack: req.body.obstaclesOnTrack, tripPlans: req.body.tripPlans, convoyLeaderStatus: req.body.convoyLeaderStatus,
        chiefDistrictStatus: req.body.chiefDistrictStatus, operationsManagerStatus: req.body.operationsManagerStatus,
        generalManagerStatus: req.body.generalManagerStatus, hseqSupervisorStatus: req.body.hseqSupervisorStatus,
        hrsEstTotals: req.body.hrsEstTotals
    };
    await Journey.findByIdAndUpdate(id, {$set: journey}, {new: true});
    res.json({status: 'Journey Updated'});
};

journeyCtrl.deleteJourney = async (req, res, next) => {
    await Journey.findByIdAndRemove(req.params.id);
    res.json({status: 'Journey Deleted'});
};

module.exports = journeyCtrl;