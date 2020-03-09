const eServicesManagement = require ('../models/eServicesManagement');
const eServicesQuestions = require('../models/eServicesQuestions');

//posibles estados de un management, en una tabla para poder ser dinamicos
const managementStatus = require ('../models/eservices/managementStatus');
const criticalReqOfManagement = require('../models/criticalReqOfManagement');
const eServicesManagementCtrl = {}; 



//todas las que ya fueron completadas por comercial 
eServicesManagementCtrl.getTendered = async (req, res, next ) =>{

       var manage = await eServicesManagement.find ({
              status: '3',
              finished: false
       })

       res.json(manage)
}

eServicesManagementCtrl.getFinished = async (req, res, next) =>{

      
       var manage = await eServicesManagement.find ({
              finished: true 
       }) 
     
       res.json(manage);

}
eServicesManagementCtrl.checkFinish = async (req, res, next) =>{

       console.log ('check finish ----------' , req.params)
       var management = ({
              finished : true 
       })

       var id  = req.params.id; 

       await eServicesManagement.findByIdAndUpdate(id, {$set: management}, {new: true}); 
       res.json('updated');

}


//buscar por criticidad 
eServicesManagementCtrl.getManagementByCriticidad = async ( req, res , next)=>{
       const criticidad = req.body.criticidad; 
      // console.log('criticidad', criticidad);
       const management = await eServicesManagement.find({
              hrisk: criticidad, 
              status: '3', 
              finished: false 
       });
       //console.log('management:', management);
       res.json(management);
}

//------------------------------------------------
//PHASE 1 INTPUT DE COMERCIAL 

eServicesManagementCtrl.getStatus = async (req, res, next ) => {
       
       const status  = await managementStatus.find()
       res.json(status);
}

eServicesManagementCtrl.createStatus = async (req,res,next) => {
       // const status = req.body; 

       const status  =  new managementStatus (req.body)
       
       // const {id} = req.status
       //  console.log('status',status )

        await status.save(); 

        res.json({status: 'saved'})
    
}

eServicesManagementCtrl.approvedManagement = async (req, res, next) => {
const  {id}  = req.params;
const management = req.body; 
if ( req.body._id ) 
{
       await eServicesManagement.findByIdAndUpdate(id, {$set: management}, {new: true}); 
       const management2 =   ({approved: 1});
       await eServicesManagement.findByIdAndUpdate(id, {$set: management2}, {new: true}); 
       res.json({status: 'con id '});
       }
        else
       {
              // const management = new eServicesManagement (req.body);
              // await management.save(); 
              // res.json( management._id );
              res.json ({
                     status: 'sin id'
              });
       }
     
}




//buscar por status 
eServicesManagementCtrl.getManagementByStatus = async ( req, res , next)=>{
       const status = req.body.status; 
       //console.log('criticidad', criticidad);
       const management = await eServicesManagement.find({
              status: status
       });
     //  console.log('management:', management);
       res.json(management);
}


eServicesManagementCtrl.getManagement = async (req, res, next) => {
       const { id } = req.params;
       const management = await eServicesManagement.findById(id);
       res.json(management);

}

eServicesManagementCtrl.getManagements = async (req, res, next) => {
       const eservicesmanagement = await eServicesManagement.find();
       res.json(eservicesmanagement);
}

eServicesManagementCtrl.newManagement  = async (req, res, next) => {
       

// console.log('==============NEwMANAGEMNT=============== ')

   const management = new eServicesManagement ({
   name:'',
})

// console.log('completo:',management);
await management.save(); 
// console.log('management id:', management._id)
res.json( management._id );
}

eServicesManagementCtrl.createManagement = async (req, res, next) => {
// console.log('==============createManagement=============== ')
// console.log('reqBody', req.body);


if (req.body[1]){
       // console.log('si existe body[1]')
       phase = '0'
       body0= req.body[0];
       body1= req.body[1];
       if (req.body[0].status){

       }else{ 
              body0.status = '1'
       }
}else{
       // console.log('no existe body[1]')
       phase = '0'
       body0= req.body;
       body1= '';

       if (req.body.status){

       }else{
              body0.status = '1'
       }
}

      





// console.log(body0);
// console.log('phase: ',phase)


const management = new eServicesManagement ({
//-----------PHASE 0---------       
name: body0.name,
serviceDetail: body0.serviceDetail,     
client: body0.client,
dateInit: body1.dateInit,
// responsibleLine: body0.responsibleLine,
ct:body0.ct,
wl:body0.wl,
wt:body0.wt,
sl:body0.sl,
fi:body0.fi,

dateEnd: body1.dateEnd,

//locaciones 
country: body0.country,
district: body0.district,
camp: body0.camp,
closter: body0.closter,


well: body0.well,
well1:body0.well1, 
well2:body0.well2, 
well3:body0.well3, 
well4:body0.well4, 


NewClient:body0.NewClient,
NewDistrict:body0.NewDistrict,
NewCamp: body0.NewCamp,
NewWell: body0.NewWell,

scopeODT: body0.scopeODT,
stimatedRevenue: body0.stimatedRevenue,
RequestInformation: body0.RequestInformation,
planningFormat: body0.planningFormat,
history: body0.history,
technicalRequirements: body0.technicalRequirements,
adminisitrativeRequirements:body0.adminisitrativeRequirements,
RRHHRequirements: body0.RRHHRequirements,
HSEQRequirements: body0.HSEQRequirements,
otherRequirements: body0.otherRequirements,

risk1: body0.risk1,
cause1: body0.cause1,
probability1: body0.probability1,
impact1: body0.impact1,
riskLevel1: body0.riskLevel1,
actions1: body0.actions1,

risk2: body0.risk2,
cause2: body0.cause2,
probability2: body0.probability2,
impact2: body0.impact2,         
riskLevel2: body0.riskLevel2,
actions2: body0.actions2,

risk3: body0.risk3,
cause3: body0.cause3,
probability3: body0.probability3,
impact3: body0.impact3,
riskLevel3: body0.riskLevel3,
actions3: body0.actions3,

risk4: body0.risk4,
cause4: body0.cause4,
probability4: body0.probability4,
impact4: body0.impact4,
riskLevel4: body0.riskLevel4,
actions4: body0.actions4,

risk5: body0.risk5,
cause5: body0.cause5,
probability5: body0.probability5,
impact5: body0.impact5,
riskLevel5: body0.riskLevel5,
actions5: body0.actions5,

milestone1:body0.milestone1,
scheduledDate1: body0.scheduledDate1,
milestone2: body0.milestone2,
scheduledDate2: body0.scheduledDate2,
milestone3: body0.milestone3,
scheduledDate3: body0.scheduledDate3,
milestone4: body0.milestone4,
scheduledDate4: body0.scheduledDate4,
milestone5: body0.milestone5,
scheduledDate5: body0.scheduledDate5,
milestone6: body0.milestone6,
scheduledDate6: body0.scheduledDate6,

exclusions: body0.exclusions,
leaderDesignation: body0.leaderDesignation,
phase:phase, 
status:body0.status,
hrisk:body0.hrisk
});
       
         
//    console.log('completo:',management);
    await management.save(); 
    res.json( management._id );
//     res.json ({
//         status: 'Management Created'
//     });
} 





eServicesManagementCtrl.editManagement = async (req, res, next) => { 

const  {id}  = req.params;
const management = req.body; 
const management0 = req.body[0];   
const management1 = req.body[1];
// console.log(id);

management0._id = id; 

// console.log('management1',management[0]);
// console.log('management2',management[1]);

await eServicesManagement.findByIdAndUpdate(id, {$set: management0}, {new: true}); 
await eServicesManagement.findByIdAndUpdate(id, {$set: management1}, {new: true});
//console.log('management updated', management);
res.json({status: 'management updated'});
// console.log('management updated');
};


eServicesManagementCtrl.deleteManagement = async (req, res, next) => {
const  {id}  = req.params;
await eServicesManagement.findByIdAndRemove(id);
res.json({status: 'Management Deleted'});
};



eServicesManagementCtrl.getQuestions = async (req, res, next) => {
//    res.json({status: 'llegamos'});
//     const {id} = req.params; //id de la pregunta 
    var phase = req.params.phase; 
//      console.log('questions body---------:', phase)
     question = await eServicesQuestions.find({phase: phase});
//      console.log('RESPONSE:', question)
    res.json(question);

}

// eServicesManagementCtrl.getQuestion = async (req, res, next) =>{ 
//        const {id } = req.params; 
//        res.json =({
//               status: 'this question',id 
//        })
// }

//PHASE 1 INTPUT DE COMERCIAL 
//------------------------------------------------


//------------------------------------------------
//PHASE 2 REQ CRITICOS DE UN MANAGEMENT YA CREADO 




//buscar todos 
eServicesManagementCtrl.getCriticalReqOfManagement = async (req,res,next)  =>{
       critical =  await criticalReqOfManagement.find();
       res.json(critical);
}

//buscar by id 
eServicesManagementCtrl.getCriticalReqById = async (req,res,next)  =>{
  
    const { id } = req.params;
    const critical = await criticalReqOfManagement.findById(id);
    res.json(critical);
}

//buscar by managementId 
eServicesManagementCtrl.getCriticalReqOfManagementId = async (req,res,next)  =>{
    
       const  managementId  = req.params.id;

       // console.log('buscando by management id ', managementId)

       const critical = await criticalReqOfManagement.find(
              {
                     managementId:managementId
              }

       );

       // console.log('resultados:' , critical)
       res.json(critical);
   }


//buscar por linea de servicio 
eServicesManagementCtrl.getManagementBySL = async (req, res, next)  => {
       const sl = req.params.sl;
       if ( sl == 'wt'){
              //console.log('wt');
              const management = await eServicesManagement.find({
                     wt : true
              })
              res.json(management); 
       }

       if ( sl == 'wl'){
              //console.log('wl');
              const management = await eServicesManagement.find({
                     wl : true
              })
              res.json(management); 
       }
       if ( sl == 'sl'){
              //console.log('wl');
              const management = await eServicesManagement.find({
                     sl : true
              })
              res.json(management); 
       }

       if ( sl == 'ct'){
              //console.log('wl');
              const management = await eServicesManagement.find({
                     ct : true
              })
              res.json(management); 
       }
       if ( sl == 'fi'){
              //console.log('wl');
              const management = await eServicesManagement.find({
                     fi : true
              })
              res.json(management); 
       }
}

//crear  

eServicesManagementCtrl.postCriticalReq = async (req,res,next)  =>{
       //  console.log('back end', req.body)
       body = req.body; 

 const criticalReq = new criticalReqOfManagement ({
       managementId: body.managementId, 
       nameClient: body.nameClient, 
       newClient: body.newClient, 
       nameCamp: body.nameCamp, 
       newCamp: body.newCamp, 
       nameWell: body.nameWell, 
       newWell: body.newWell, 
       nameDistrict: body.nameDistrict, 
       newDistrict: body.newDistrict, 
       moreRiskDetails: body.moreRiskDetails, 
       technologyReq: body.technologyReq, 
       moreTechnologyDetails: body.moreTechnologyDetails, 
       hseReq: body.hseReq, 
       moreHseDetails: body.moreHseDetails, 
       riskZone: body.riskZone, 
       wellReq: body.wellReq, 
       moreWellDetails: body.moreWellDetails, 
       operationReq: body.operationReq, 
       moreOperationDetails: body.moreOperationDetails, 
       hrisk:body.hrisk,
       });

       if (body.hrisk == '1'){

               const id = body.managementId; 
             //  console.log('criticalReq created111111111111111111111111111111111111111111111')
               const management =  ({
                     hrisk: '1'
              });

              await eServicesManagement.findByIdAndUpdate(id, {$set: management}, {new: true}); 
       }else{
       //        const id = body.managementId; 
       //        console.log('criticalReq created222222222222222')
       //        const management =  ({
       //              hrisk: '0'
       //       });

             await eServicesManagement.findByIdAndUpdate(id, {$set: management}, {new: true}); 
       }

         await criticalReq.save(); 
       //   console.log('criticalReq create  d')
         res.json( criticalReq._id );

}


//editar 
eServicesManagementCtrl.putCriticalReq = async (req,res,next)  =>{

       const  {id}  = req.params;
       const CriticalReq = req.body;
       
       // console.log('CriticalReq', CriticalReq);

       if (CriticalReq.hrisk == '1') {
              const id = CriticalReq.managementId; 
              // console.log('criticalReq created111111111111111111111111111111111111111111111')
             const management =  ({
                           hrisk: '1'
                    });
              // console.log(management)
             await eServicesManagement.findByIdAndUpdate(id, {$set: management}, {new: true}); 
       }

await criticalReqOfManagement.findByIdAndUpdate(id, {$set: CriticalReq}, {new: true});
res.json({status: 'criticalReqOfManagement updated'});
// console.log('criticalReqOfManagement updated');
}
//PHASE 2 REQ CRITICOS DE UN MANAGEMENT YA CREADO 
//------------------------------------------------







//------------------------------------------------
//saltar de fase  
eServicesManagementCtrl.upStatusOfManagement = async (req,res,next)  =>{

       const  {id}  = req.params;
       
       const management =  ({
       phase:'2', 
});

       await eServicesManagement.findByIdAndUpdate(id, {$set: management}, {new: true});
       
       res.json({status: 'phase updated to phase 2'});
}
//saltar de fase 
//------------------------------------------------


//-----------------------------------
//cambiar status de KOM 

eServicesManagementCtrl.changueStatus= async (req,res,next)  =>{ 
//      console.log('bodyyy', req.body)
       const  {id}  = req.params;

       const management =  ({
              status:req.body.status, 
       });

       // console.log('managentntrtter: ',management)
       await eServicesManagement.findByIdAndUpdate(id, {$set: management}, {new: true});

       
       res.json({status: 'KOM status updated'});
}


eServicesManagementCtrl.findByDate = async (req, res, next) =>{
       // console.log('find by date', req.body);
       // date1 = new Date(req.body.dateInit);
       // console.log(date1);

       //{tripduration: {"$gte": 60, "$lt": 65}} 
       filters = await eServicesManagement.find ({
              dateInit:{$gte:(req.body.dateInit), $lt:(req.body.dateEnd)}
       })
       // filtres =   await eservicesmanagement.find ({dateInit: {$gte: dateInit}}, {dateEnd: {$lt : dateEnd}})
       // console.log(filters);
       res.json(filters);
       
}

module.exports = eServicesManagementCtrl;