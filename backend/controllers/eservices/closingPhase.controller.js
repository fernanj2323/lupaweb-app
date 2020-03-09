const closingPhase = require ('../../models/eservices/closingPhase');
const closingCRL = {};

closingCRL.getClosingPhaseByManagementId    = async(req, res) =>{
const managementId = req.params.id;
const closing = await closingPhase.find({ managementId: managementId});
res.json(closing);

}


closingCRL.getClosingPhaseById = async(req, res) =>{
const id = req.params.id;
const closing = await closingPhase.findById(id);
res.json(closing);

}


closingCRL.postClosing = async (req, res) =>{
    const array = new closingPhase (req.body); 
    await array.save();
    res.json({
        status: 'closingPhase Saved'
    });

}

closingCRL.putClosing = async (req, res) =>{
    const array =  req.body;
    const id = req.params.id;
    await closingPhase.findByIdAndUpdate(id, {$set:array})
    res.json({
        status: 'closingPhase updated'
    });

}


module.exports = closingCRL;