const jobBrief = require ('../../models/eservices/jobBrief');
const jobCtrl = {};

jobCtrl.getJobBymanagementId =  async(req, res) =>{
    const managementId = (req.params.managementId);
    const jobs = await jobBrief.find({
        managementId:managementId
    });
    res.json(jobs);
}


jobCtrl.getJobBymanagementIdAndServiceLine =  async(req, res) =>{
    const managementId = (req.body.managementId);
    const serviceLine = (req.body.serviceLine);
    console.log(req.body);
    const jobs = await jobBrief.find({
        managementId:managementId,
        serviceLine:serviceLine
    });

    res.json(jobs);
}

jobCtrl.getJobById = async (req, res) =>{

   const id = req.params.id;
   const job = jobCtrl.findById(id);
   res.json(job);

}

jobCtrl.postJob = async (req, res) =>{
    const job = new jobBrief (req.body);
    await job.save();
    res.json({
        status: 'JOb Created'
    });
}


jobCtrl.putJob = async (req, res) =>{
    const job = (req.body);
    const id  = (req.params.id); 
    await jobBrief.findByIdAndUpdate(id, {$set:job});
    res.json('Job Updated');
    
}






module.exports = jobCtrl;