const IRO = require ('../../models/eservices/IRO');
const IROCtrl = {};


IROCtrl.getIroByManagementID  = async(req, res) =>{
    
    const managementId = (req.params.id)
    const iros = await IRO.find ({
       managementId:managementId
   })
    res.json(iros);
}


IROCtrl.getIros  = async(req, res) =>{
    const iros = await IRO.find();
    res.json(iros);

}


IROCtrl.postIro  = async(req, res) =>{
    //console.log('POST IRO', req.body.managementId.managementId)
    const params = new IRO (req.body.managementId);
    await params.save()
    res.json('IRO Created');

}

IROCtrl.getIroByManagementIDandSL  = async(req, res) =>{
   // console.log(req.body)
     var sl = req.body.sl; 
     var managementId = req.body.managementId; 
     const iros = await IRO.find ({
        managementId:managementId,
        sl:sl 
    })
  //  console.log(iros)
    res.json(iros);
}



IROCtrl.putIro  = async(req, res) =>{
    //console.log('PUT IRO', req.body)
    const params = (req.body);
    const id = (req.params.id);
    await IRO.findByIdAndUpdate(id, {$set:params})
    res.json('IRO Updated');

}




module.exports = IROCtrl;