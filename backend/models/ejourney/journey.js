const mongoose = require('mongoose');
const { Schema } = mongoose;

const vehiclesSchema = new Schema({
    vehicle: { type: Schema.ObjectId, ref: 'Vehicle'},
    licence : String, soat: String, riskPolicy: String,
    contractualPolicy: String, chargeExt: String, 
    contractExt: String
});
const driversSchema = new Schema({
    driver: { type: Schema.ObjectId, ref: 'Users'},
    role: String, lastRest: Number, licence: String, uid: String, payments: String, courses: String,
    keyAsign: String, mercancyCourse: String, epp: String
});
const passengersSchema = new Schema({
    passenger: String, uid: String, company: String, phone: String
});
const dangerousMercancySchema = new Schema({
    mercancy: String, emergencyCard: String, packaging: String, label: String, unitedNationsCode: String, inspection: String
});
const tripPlansSchema = new Schema({
    date: String, estHour: String, place: String, reporter: String, hour: String, comments: String, type: String
});

const journeySchema = new Schema(
    {
        title: String,
        comments: String,
        status: String,
        jdate: String,
        journeyQuestion: Number,
        department: String,
        journeyReason: String,
        vehicleType: String,
        origin: String,
        destiny: String,
        departureTime: String,
        checkIn: String,
        checkInReal: String,
        estimatedDistance: String,
        vialSecurityPolitics: Number,
        driversInspection: Number,
        vehiclesConditions: Number,
        vehiclesMonitoring: Number,
        user: { type: Schema.ObjectId, ref: 'Users'},
        vehicles: [vehiclesSchema],
        drivers: [driversSchema],
        passengers: [passengersSchema],
        dangerousMercancy: [dangerousMercancySchema],
        riskResultA: Number, riskResultB: Number, riskResultC: Number,
        riskResultD: Number, riskResultE: Number, riskResultF: Number,
        riskResultG: Number, riskResultH: Number, riskResultI: Number,
        riskResultJ: Number, riskResultK: Number, riskResultTotals: Number,
        wheatherState: String, roadCondition: String, publicRisk: String,
        travelTime: String, breakTime: String, electricLines: String, obstaclesOnTrack: String,
        tripPlans: [tripPlansSchema], convoyLeaderStatus: String, chiefDistrictStatus: String,
        operationsManagerStatus: String, generalManagerStatus: String, hseqSupervisorStatus: String,
        hrsEstTotals: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Journeys', journeySchema);