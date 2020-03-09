const mongoose = require('mongoose');
const { Schema } = mongoose;


const criticalReqOfManagementSchema = new Schema({
    ///datos de start management 
    managementId: { type: String}, 
    nameClient: { type: String},
    newClient: { type: Boolean},
    nameCamp: { type: String},
    newCamp: {type:Boolean}, 
    nameWell: {type:String}, 
    newWell:{type:Boolean},
    nameDistrict: { type: String },
    newDistrict: {type: Boolean}, 

    ///nuevos datos criticos 
    technologyReq: {type: String}, 
    moreTechnologyDetails: {type: String},

    hseReq: {type:String}, 
    moreHseDetails: {type: String},

    riskZone: {type: Boolean},
    moreRiskDetails: {type: String},
    wellReq:{type: String},
    moreWellDetails: {type: String},

    operationReq:{type:String},
    moreOperationDetails: {type: String},
    hrisk:{type:Number}
});

module.exports = mongoose.model('criticalReqOfManagement', criticalReqOfManagementSchema);