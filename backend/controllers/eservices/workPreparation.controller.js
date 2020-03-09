const workPreparation = require ('../../models/eservices/workPreparation');
const hseElements = require ('../../models/eservices/hseElements');
const  fiRequirements = require ('../../models/eservices/fiRequirements');

const workPreparationCtrl = {};



workPreparationCtrl.getWorkPreparation = async ( req, res ) =>{


    id = req.params; 
   // console.log('getWorkPreparation*************',id)
 }


 workPreparationCtrl.getWorkpreparationByManagementId = async (req, res) =>{
    // console.log(req.params.id)
    const work = await workPreparation.find({
        managementId: req.params.id
    })
   // console.log(work)
    res.json(work)
}

workPreparationCtrl.getWorkpreparationByManagementIdandSl = async (req, res) =>{
    // console.log(req.params)
    // console.log(req.body)  
    var serviceL = req.body.sl;

    const work=  await workPreparation.find({
        managementId:req.params.managementId,
        serviceLine: serviceL
    })

    // console.log(work)
     res.json(work);
  

}

workPreparationCtrl.getWorkpreparationByManagementIdandAuthId = async (req, res) =>{

  //  console.log(req.params)
 //   console.log(req.body)  

    const work = await workPreparation.find({
        // creator:req.body.userId, 
        managementId:req.params.managementId,
        creator:req.body.userId,
        serviceLine: req.body.serviceLine 
     })

 //    console.log(work)
     res.json(work);
}




workPreparationCtrl.saveWorkPreparation = async (req, res) =>{
    //console.log('++++++++++++++++++++++++++++++++++++++++++')

  //   console.log('creator', req.body)

     if(req.body.planeationFormatobservation2){
        req.body.planeationFormatshowOb2 = '1';
        }
        if(req.body.planeationFormatobservation3){
            req.body.planeationFormatshowOb3 = '1';
        }
        
       
        if(req.body.simulationobservation2){
           req.body.simulationshowOb2 = '1';
       }
       if(req.body.simulationobservation3){
           req.body.simulationshowOb3 = '1';
       }
       
       if(req.body.specificDiagramobservation2){
           req.body.specificDiagramshowOb2 = '1';
       }
       if(req.body.specificDiagramobservation3){
           req.body.specificDiagramshowOb3 = '1';
       }
       
       if(req.body.accessVerificationobservation2){
           req.body.accessVerificationshowOb2 = '1';
       }
       if(req.body.accessVerificationobservation3){
           req.body.accessVerificationshowOb3 = '1';
       }
       
       
       if(req.body.wellConditionobservation2){
           req.body.wellConditionshowOb2 = '1';
       }
       if(req.body.wellConditionobservation3){
           req.body.wellConditionshowOb3 = '1';
       }
       
       
       
       if(req.body.materialSpecificationsobservation2){
           req.body.materialSpecificationsshowOb2 = '1';
       }
       if(req.body.materialSpecificationsobservation3){
           req.body.materialSpecificationsshowOb3 = '1';
       }
         
       
       
       if(req.body.checkMapre1observation2){
           req.body.checkMapre1showOb2 = '1';
       }
       if(req.body.checkMapre1observation3){
           req.body.checkMapre1showOb3 = '1';
       }
         
       
       
       
       if(req.body.preventiveMapre23observation2){
           req.body.preventiveMapre23showOb2 = '1';
       }
       if(req.body.preventiveMapre23observation3){
           req.body.preventiveMapre23showOb3 = '1';
       }
         
       
       
       if(req.body.selectionBhaobservation2){
           req.body.selectionBhashowOb2 = '1';
       }
       if(req.body.selectionBhaobservation3){
           req.body.selectionBhashowOb3 = '1';
       }
         
       
       
       if(req.body.h2sConfirmationobservation2){
           req.body.h2sConfirmationshowOb2 = '1';
       }
       if(req.body.h2sConfirmationobservation3){
           req.body.h2sConfirmationshowOb3 = '1';
       }
         
       if(req.body.laboratTestobservation2){
           req.body.laboratTestshowOb2 = '1';
       }
       if(req.body.laboratTestobservation3){
           req.body.laboratTestshowOb3 = '1';
       }
         
       
       
       if(req.body.locationPreinspectionobservation2){
           req.body.locationPreinspectionshowOb2 = '1';
       }
       if(req.body.locationPreinspectionobservation3){
           req.body.locationPreinspectionshowOb3 = '1';
       }
         
       
       if(req.body.materialsSpecifications2Ob2){
           req.body.materialsSpecifications2showOb2 = '1';
       }
       if(req.body.materialsSpecifications2Ob3){
           req.body.materialsSpecifications2showOb3 = '1';
       }
         
       
       if(req.body.continToolsobservation2){
           req.body.continToolsshowOb2 = '1';
       }
       if(req.body.continToolsobservation2){
           req.body.continToolsshowOb3 = '1';
       }
         
       
       if(req.body.operationalProgramobservation2){
           req.body.operationalProgramshowOb2 = '1';
       }
       if(req.body.operationalProgramobservation3){
           req.body.operationalProgramshowOb3 = '1';
       }
         
       
       if(req.body.teamEvaluationobservation2){
           req.body.teamEvaluationshowOb2 = '1';
       }
       if(req.body.teamEvaluationobservation3){
           req.body.teamEvaluationshowOb3 = '1';
       }
         
       if(req.body.continPlansobservation2){
           req.body.continPlansshowOb2 = '1';
       }
       if(req.body.continPlansobservation3){
           req.body.continPlansshowOb3 = '1';
       }
       if(req.body.preventionMedsobservation2){
           req.body.preventionMedsshowOb2 = '1';
       }
       if(req.body.preventionMedsobservation3){
           req.body.preventionMedsshowOb3 = '1';
       }
         
       
       if(req.body.cumpliVerificationobservation2){
           req.body.cumpliVerificationshowOb2 = '1';
       }
       if(req.body.cumpliVerificationobservation3){
           req.body.cumpliVerificationshowOb3 = '1';
       }
         
       
       
       if(req.body.changeManagmentobservation2){
           req.body.changeManagmentshowOb2 = '1';
       }
       if(req.body.changeManagmentobservation3){
           req.body.changeManagmentshowOb3 = '1';
       }
         
       
       
       if(req.body.requestIOb2){
           req.body.requestIshow2 = '1';
       }
       if(req.body.requestIOb3){
           req.body.requestIshow3 = '1';
       }
         
       
       
       if(req.body.opScopeOb2){
           req.body.opScopeshow2 = '1';
       }
       if(req.body.opScopeOb3){
           req.body.opScopeshow3 = '1';
       }
         
       
       
       if(req.body.paleationFOb2){
           req.body.paleationFshow2 = '1';
       }
       if(req.body.paleationFOb3){
           req.body.paleationFshow3 = '1';
       }
         
       
       if(req.body.laboratoryOb2){
           req.body.laboratoryshow2 = '1';
       }
       if(req.body.laboratoryOb3){
           req.body.laboratoryshow3 = '1';
       }
       
       
       
       if(req.body.LayoutOb2){
           req.body.Layoutshow2 = '1';
       }
       if(req.body.LayoutOb3){
           req.body.Layoutshow3 = '1';
       }
       
       
       
       if(req.body.fiWellConditionOb2){
           req.body.fiWellConditionshow2 = '1';
       }
       if(req.body.fiWellConditionOb3){
           req.body.fiWellConditionshow3 = '1';
       }
       
       
       
       
       if(req.body.waterConditionOb2){
           req.body.waterConditionshow2 = '1';
       }
       if(req.body.waterConditionOb3){
           req.body.waterConditionshow3 = '1';
       }
       
       
       if(req.body.fih2sOb2){
           req.body.fih2sshow2 = '1';
       }
       if(req.body.fih2sOb3){
           req.body.fih2sshow3 = '1';
       }
       
       
       
       if(req.body.conectionOb2){
           req.body.conectionshow2 = '1';
       }
       if(req.body.conectionOb3){
           req.body.conectionshow3 = '1';
       }
       
       
       
       
       if(req.body.bombSelectionOb2){
           req.body.bombSelectionshow2 = '1';
       }
       if(req.body.bombSelectionOb3){
           req.body.bombSelectionshow3 = '1';
       }
       
       
       
       
       if(req.body.auxOb2){
           req.body.auxshow2 = '1';
       }
       if(req.body.auxOb3){
           req.body.auxshow3 = '1';
       }
       
       
       
       if(req.body.layoutOb2){
           req.body.layoutshow2 = '1';
       }
       if(req.body.layoutOb3){
           req.body.layoutshow3= '1';
       }
       
       
       
       if(req.body.preinspectionOb2){
           req.body.preinspectionshow2 = '1';
       }
       if(req.body.preinspectionOb3){
           req.body.preinspectionshow3 = '1';
       }
       
       
       
       if(req.body.mapreOb2){
           req.body.mapreshow2 = '1';
       }
       if(req.body.mapreOb3){
           req.body.mapreshow3 = '1';
       }
       
       
       
       
       if(req.body.validationOb2){
           req.body.validationshow2 = '1';
       }
       if(req.body.validationOb3){
           req.body.validationshow3 = '1';
       }
       
       
       
       
       if(req.body.generadoresOb2){
           req.body.generadoresshow2 = '1';
       }
       if(req.body.generadoresOb3){
           req.body.generadoresshow3 = '1';
       }
       
       
       
       
       if(req.body.systemOb2){
           req.body.systemshow2 = '1';
       }
       if(req.body.systemOb3){
           req.body.systemshow3 = '1';
       }
       //------------------------------------
       
        
        
        const work = new workPreparation (req.body);
        
    
        
   // console.log('arrglado', work)
    await work.save();

    res.json({
         work: work, 
        status: 'created',
    })
}


workPreparationCtrl.editWork = async (req, res) => {
   // console.log('editWork' )

    id = req.params.id; 
  
 if(req.body.planeationFormatobservation2){
 req.body.planeationFormatshowOb2 = '1';
 }
 if(req.body.planeationFormatobservation3){
     req.body.planeationFormatshowOb3 = '1';
 }
 

 if(req.body.simulationobservation2){
    req.body.simulationshowOb2 = '1';
}
if(req.body.simulationobservation3){
    req.body.simulationshowOb3 = '1';
}

if(req.body.specificDiagramobservation2){
    req.body.specificDiagramshowOb2 = '1';
}
if(req.body.specificDiagramobservation3){
    req.body.specificDiagramshowOb3 = '1';
}

if(req.body.accessVerificationobservation2){
    req.body.accessVerificationshowOb2 = '1';
}
if(req.body.accessVerificationobservation3){
    req.body.accessVerificationshowOb3 = '1';
}


if(req.body.wellConditionobservation2){
    req.body.wellConditionshowOb2 = '1';
}
if(req.body.wellConditionobservation3){
    req.body.wellConditionshowOb3 = '1';
}



if(req.body.materialSpecificationsobservation2){
    req.body.materialSpecificationsshowOb2 = '1';
}
if(req.body.materialSpecificationsobservation3){
    req.body.materialSpecificationsshowOb3 = '1';
}
  


if(req.body.checkMapre1observation2){
    req.body.checkMapre1showOb2 = '1';
}
if(req.body.checkMapre1observation3){
    req.body.checkMapre1showOb3 = '1';
}
  



if(req.body.preventiveMapre23observation2){
    req.body.preventiveMapre23showOb2 = '1';
}
if(req.body.preventiveMapre23observation3){
    req.body.preventiveMapre23showOb3 = '1';
}
  


if(req.body.selectionBhaobservation2){
    req.body.selectionBhashowOb2 = '1';
}
if(req.body.selectionBhaobservation3){
    req.body.selectionBhashowOb3 = '1';
}
  


if(req.body.h2sConfirmationobservation2){
    req.body.h2sConfirmationshowOb2 = '1';
}
if(req.body.h2sConfirmationobservation3){
    req.body.h2sConfirmationshowOb3 = '1';
}
  
if(req.body.laboratTestobservation2){
    req.body.laboratTestshowOb2 = '1';
}
if(req.body.laboratTestobservation3){
    req.body.laboratTestshowOb3 = '1';
}
  


if(req.body.locationPreinspectionobservation2){
    req.body.locationPreinspectionshowOb2 = '1';
}
if(req.body.locationPreinspectionobservation3){
    req.body.locationPreinspectionshowOb3 = '1';
}
  

if(req.body.materialsSpecifications2Ob2){
    req.body.materialsSpecifications2showOb2 = '1';
}
if(req.body.materialsSpecifications2Ob3){
    req.body.materialsSpecifications2showOb3 = '1';
}
  

if(req.body.continToolsobservation2){
    req.body.continToolsshowOb2 = '1';
}
if(req.body.continToolsobservation2){
    req.body.continToolsshowOb3 = '1';
}
  

if(req.body.operationalProgramobservation2){
    req.body.operationalProgramshowOb2 = '1';
}
if(req.body.operationalProgramobservation3){
    req.body.operationalProgramshowOb3 = '1';
}
  

if(req.body.teamEvaluationobservation2){
    req.body.teamEvaluationshowOb2 = '1';
}
if(req.body.teamEvaluationobservation3){
    req.body.teamEvaluationshowOb3 = '1';
}
  
if(req.body.continPlansobservation2){
    req.body.continPlansshowOb2 = '1';
}
if(req.body.continPlansobservation3){
    req.body.continPlansshowOb3 = '1';
}
if(req.body.preventionMedsobservation2){
    req.body.preventionMedsshowOb2 = '1';
}
if(req.body.preventionMedsobservation3){
    req.body.preventionMedsshowOb3 = '1';
}
  

if(req.body.cumpliVerificationobservation2){
    req.body.cumpliVerificationshowOb2 = '1';
}
if(req.body.cumpliVerificationobservation3){
    req.body.cumpliVerificationshowOb3 = '1';
}
  


if(req.body.changeManagmentobservation2){
    req.body.changeManagmentshowOb2 = '1';
}
if(req.body.changeManagmentobservation3){
    req.body.changeManagmentshowOb3 = '1';
}
  


if(req.body.requestIOb2){
    req.body.requestIshow2 = '1';
}
if(req.body.requestIOb3){
    req.body.requestIshow3 = '1';
}
  


if(req.body.opScopeOb2){
    req.body.opScopeshow2 = '1';
}
if(req.body.opScopeOb3){
    req.body.opScopeshow3 = '1';
}
  


if(req.body.paleationFOb2){
    req.body.paleationFshow2 = '1';
}
if(req.body.paleationFOb3){
    req.body.paleationFshow3 = '1';
}
  

if(req.body.laboratoryOb2){
    req.body.laboratoryshow2 = '1';
}
if(req.body.laboratoryOb3){
    req.body.laboratoryshow3 = '1';
}



if(req.body.LayoutOb2){
    req.body.Layoutshow2 = '1';
}
if(req.body.LayoutOb3){
    req.body.Layoutshow3 = '1';
}



if(req.body.fiWellConditionOb2){
    req.body.fiWellConditionshow2 = '1';
}
if(req.body.fiWellConditionOb3){
    req.body.fiWellConditionshow3 = '1';
}




if(req.body.waterConditionOb2){
    req.body.waterConditionshow2 = '1';
}
if(req.body.waterConditionOb3){
    req.body.waterConditionshow3 = '1';
}


if(req.body.fih2sOb2){
    req.body.fih2sshow2 = '1';
}
if(req.body.fih2sOb3){
    req.body.fih2sshow3 = '1';
}



if(req.body.conectionOb2){
    req.body.conectionshow2 = '1';
}
if(req.body.conectionOb3){
    req.body.conectionshow3 = '1';
}




if(req.body.bombSelectionOb2){
    req.body.bombSelectionshow2 = '1';
}
if(req.body.bombSelectionOb3){
    req.body.bombSelectionshow3 = '1';
}




if(req.body.auxOb2){
    req.body.auxshow2 = '1';
}
if(req.body.auxOb3){
    req.body.auxshow3 = '1';
}



if(req.body.layoutOb2){
    req.body.layoutshow2 = '1';
}
if(req.body.layoutOb3){
    req.body.layoutshow3= '1';
}



if(req.body.preinspectionOb2){
    req.body.preinspectionshow2 = '1';
}
if(req.body.preinspectionOb3){
    req.body.preinspectionshow3 = '1';
}



if(req.body.mapreOb2){
    req.body.mapreshow2 = '1';
}
if(req.body.mapreOb3){
    req.body.mapreshow3 = '1';
}




if(req.body.validationOb2){
    req.body.validationshow2 = '1';
}
if(req.body.validationOb3){
    req.body.validationshow3 = '1';
}




if(req.body.generadoresOb2){
    req.body.generadoresshow2 = '1';
}
if(req.body.generadoresOb3){
    req.body.generadoresshow3 = '1';
}




if(req.body.systemOb2){
    req.body.systemshow2 = '1';
}
if(req.body.systemOb3){
    req.body.systemshow3 = '1';
}
//------------------------------------

  

const work = (req.body);
await workPreparation.findByIdAndUpdate(id, {$set:work});
//console.log('work',work)
// console.log('edited',edited)    
res.json({status: 'updated'})

}

// elementos de hse 

workPreparationCtrl.editHseElements = async (req, res) =>{
    const hse = (req.body)
    const id = req.params.id
    // console.log('hse',hse, 'id', id)

    await hseElements.findByIdAndUpdate(id, {$set:hse});
    res.json({status: 'updated'})
}

workPreparationCtrl.saveHseElements = async (req, res) =>{
   // console.log(req.body);
    const hse= new hseElements (req.body)
    await hse.save()
    res.json(' hse Element saved')
   
}




workPreparationCtrl.getHseElements = async (req, res) =>{
  //  console.log(req.body);

 //   console.log('getHseElements')

    const hse = await hseElements.find({
        workPreparationId: req.body.workPreparationId
    })

    res.json(hse);

}

//requeriminetos de frente de inyeccion 
workPreparationCtrl.getFiRequierements = async (req, res) =>{

    // console.log(req.params.id);
    // const id =   req.params.id; 
    const fi = await fiRequirements.find({
        workPreparationId:req.body.workPreparationId, 
        userId:req.body.userId,
    })

    res.json(fi);
}

workPreparationCtrl.editFiRequirements = async(req, res) =>{
    const fi = (req.body)
    const id = req.params.id
    // console.log('hse',hse, 'id', id)

    await fiRequirements.findByIdAndUpdate(id, {$set:fi});

    res.json('updated');
}

workPreparationCtrl.createFiRequirements = async (req, res)=>{
  //  console.log(req.body);
    const fi= new fiRequirements (req.body)
    await fi.save()
    res.json('fi Element saved')
   
}





module.exports = workPreparationCtrl;