const lections = require ('../../models/eservices/lections')
const lectionsCTRL = {};

lectionsCTRL.getLectionByManagementId = async (req, res) =>{

 //console.log('lecionts fun d ' , req.params.managementId)
    const le = await lections.find({
        managementId:req.params.managementId,
      
    });
    
    res.json(le);
}

lectionsCTRL.postLection= async (req , res) =>{

    const newLection = new lections (req.body)
    await newLection.save();
    res.json({
        status: 'lection created'
    });
}

lectionsCTRL.putLection = async (req, res) =>{
     const Putted = (req.body)
     const id = (req.params.id)
     await lections.findByIdAndUpdate(id, {$set:Putted})
     res.json('lection updated');
     
}

module.exports = lectionsCTRL;