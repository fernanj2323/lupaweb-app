const mongoose = require('mongoose');
const { Schema } = mongoose;

const workPreparationSchema = new Schema 
 ({

    // _id:{type:String},
    created: {type: String},
    approved:  {type: String},
    creator: {type: String}, 
    approver:{ type: String},
    responsable:{type: String},
    managementId: {type: String},
    //status 1: iniciado
    //status 2: completado, a espera de aprobacion 
    //status 3: aprobado 
    status: {type: String}, 

    serviceLine:{type:String},
    serviceLineCt:{type: Boolean},
    serviceLineFi:{type: Boolean},
    serviceLineSl:{type: Boolean},
    serviceLineWl:{type: Boolean},
    serviceLineWt:{type: Boolean},


    //  <!-- primera pregunta -->
    planeationFormatstatusQuestion:{type: Boolean},
    planeationFormatobservation1:{type:String},
    planeationFormatobservation2:{type:String},
    planeationFormatobservation3:{type:String},
    planeationFormatshowOb2:{type:String},
    planeationFormatshowOb3:{type:String},
    planeationFormatresponsable:{type:String},
    



         //pregunta 2
         simulationstatusQuestion:{type: Boolean},
         simulationobservation1:{type:String},
         simulationobservation2:{type:String},
         simulationobservation3:{type:String},
         simulationshowOb2:{type:String},
         simulationshowOb3:{type:String},
         simulationresponsable:{type:String},

  //pregunta 3 

  specificDiagramstatusQuestion:{type: Boolean},
  specificDiagramobservation1:{type:String},
  specificDiagramobservation2:{type:String},
  specificDiagramobservation3:{type:String},
  specificDiagramshowOb2:{type:String},
  specificDiagramshowOb3:{type:String},
  specificDiagramresponsable:{type:String},

   
    //pregunta4 
    accessVerificationstatusQuestion:{type: Boolean},
    accessVerificationobservation1: {type:String},
    accessVerificationobservation2: {type:String},
    accessVerificationobservation3: {type:String},
    accessVerificationshowOb2:{type:String},
    accessVerificationshowOb3:{type:String},
    accessVerificationaction:{type:String},
    accessVerificationresponsable:{type:String},



    //pregunta  5 
        wellConditionstatusQuestion:{type: Boolean}, 
        wellConditionobservation1: {type:String},
        wellConditionobservation2: {type:String},
        wellConditionobservation3: {type:String},
        wellConditionshowOb2:{type:String},
        wellConditionshowOb3:{type:String},
        wellConditionaction:{type:String},
        wellConditionresponsable:{type:String},


    //pregunta 6

    materialSpecificationsobservation1: {type:String}, 
    materialSpecificationsobservation2: {type:String},
    materialSpecificationsobservation3: {type:String},
    materialSpecificationsshowOb3:{type:String},
    materialSpecificationsshowOb2:{type:String},
    materialSpecificationsstatusQuestion:{type: Boolean}, 
    materialSpecificationsresponsable:{type:String},


    //pregunta 7 

    checkMapre1observation1: {type:String}, 
    checkMapre1observation2: {type:String},
    checkMapre1observation3: {type:String},
    checkMapre1showOb2:{type:String},
    checkMapre1showOb3:{type:String},
    checkMapre1action:{type:String},
    checkMapre1statusQuestion:{type: Boolean}, 
    checkMapre1responsable:{type:String},


    //pregunta 8 
        preventiveMapre23observation1: {type:String},
        preventiveMapre23observation2: {type:String},
        preventiveMapre23observation3: {type:String},
        preventiveMapre23showOb2:{type:String},
        preventiveMapre23showOb3:{type:String},
        preventiveMapre23action:{type:String},
        preventiveMapre23statusQuestion:{type: Boolean}, 
        preventiveMapre23responsable:{type:String},
    
        //pregunta 9
        selectionBhaobservation1: {type:String},
        selectionBhaobservation2: {type:String},
        selectionBhaobservation3: {type:String},
        selectionBhashowOb2:{type:String},
        selectionBhashowOb3:{type:String},
        selectionBhaaction:{type:String},
        selectionBhastatusQuestion:{type: Boolean}, 
        selectionBharesponsable:{type:String},

        //pregunta 10
        h2sConfirmationobservation1: {type:String},
        h2sConfirmationobservation2: {type:String},
        h2sConfirmationobservation3: {type:String},
        h2sConfirmationshowOb2:{type:String},
        h2sConfirmationshowOb3:{type:String},
        h2sConfirmationaction:{type:String},
        h2sConfirmationstatusQuestion:{type: Boolean},
        h2sConfirmationresponsable:{type:String},


         //pregunta 11
        laboratTestobservation1: {type:String},
        laboratTestobservation2: {type:String},
        laboratTestobservation3: {type:String},
        laboratTestshowOb2:{type:String},
        laboratTestshowOb3:{type:String},
        laboratTestaction:{type:String},
        laboratTeststatusQuestion:{type: Boolean}, 
        laboratTestresponsable:{type:String},


        //pregunta 12
        locationPreinspectionobservation1: {type:String},
        locationPreinspectionobservation2: {type:String},
        locationPreinspectionobservation3: {type:String},
        locationPreinspectionshowOb2:{type:String},
        locationPreinspectionshowOb3:{type:String},
        locationPreinspectionaction:{type:String},
        locationPreinspectionstatusQuestion:{type: Boolean}, 
        locationPreinspectionresponsable:{type:String},
    
        //pregunta 13
        materialsSpecifications2Ob1: {type:String},
        materialsSpecifications2Ob2: {type:String},
        materialsSpecifications2Ob3: {type:String},
        materialsSpecifications2showOb2:{type:String},
        materialsSpecifications2showOb3:{type:String},
        materialsSpecifications2action:{type:String},
        materialsSpecifications2StatusQ:{type: Boolean}, 
        materialsSpecifications2resp:{type:String},


      //pregunta14 
        continToolsobservation1: {type:String},
        continToolsobservation2: {type:String},
        continToolsobservation3: {type:String},
        continToolsshowOb2:{type:String},
        continToolsshowOb3:{type:String},
        continToolsaction:{type:String},
        continToolsstatusQuestion:{type: Boolean},
        continToolsresponsable:{type:String},
      
      
        //pregunta15
        operationalProgramobservation1: {type:String},
        operationalProgramobservation2: {type:String},
        operationalProgramobservation3: {type:String},
        operationalProgramshowOb2:{type:String},
        operationalProgramshowOb3:{type:String},
        operationalProgramaction:{type:String},
        operationalProgramstatusQuestion:{type: Boolean},
        operationalProgramresponsable:{type:String},


        //pregunta16
        teamEvaluationobservation1: {type:String},
        teamEvaluationobservation2: {type:String},
        teamEvaluationobservation3: {type:String},
        teamEvaluationshowOb2:{type:String},
        teamEvaluationshowOb3:{type:String},
        teamEvaluationaction:{type:String},
        teamEvaluationstatusQuestion:{type: Boolean},
        teamEvaluationresponsable:{type:String},


    //pregunta 17

        continPlansobservation1: {type:String},
        continPlansobservation2: {type:String},
        continPlansobservation3: {type:String},
        continPlansshowOb2:{type:String},
        continPlansshowOb3:{type:String},
        continPlansaction:{type:String},
        continPlansstatusQuestion:{type: Boolean},
        continPlansresponsable:{type:String},


        
        continPlansobservation1HSE: {type:String},
 
      
        continPlansstatusQuestionHSE:{type: Boolean},
  

        //pregunta 18
        preventionMedsobservation1: {type:String},
        preventionMedsobservation2: {type:String},
        preventionMedsobservation3: {type:String},
        preventionMedsshowOb2:{type:String},
        preventionMedsshowOb3:{type:String},
        preventionMedsaction:{type:String},
        preventionMedsstatusQuestion:{type: Boolean},
        preventionMedsresponsable:{type:String},
  

     //pregunta 19
     cumpliVerificationobservation1: {type:String},
     cumpliVerificationobservation2: {type:String},
     cumpliVerificationobservation3: {type:String},
     cumpliVerificationshowOb3:{type:String},
     cumpliVerificationshowOb2:{type:String},
    cumpliVerificationstatusQuestion:{type: Boolean},
    cumpliVerificationresponsable:{type:String},
    
 //pregunta 20
    changeManagmentobservation1: {type:String},
    changeManagmentobservation2: {type:String},
    changeManagmentobservation3: {type:String},
    changeManagmentshowOb2:{type:String},
    changeManagmentshowOb3:{type:String},
    changeManagmentaction:{type:String},
    changeManagmentstatusQuestion:{type: Boolean},
    changeManagmentresponsable:{type:String},


    //preguntas de fi 

    // fi 1 
    requestIOb1: {type:String},
    requestIOb2: {type:String},
    requestIOb3: {type:String},
    requestIshow2: {type:String},
    requestIshow3: {type:String},
    requestIstatus:{type: Boolean},
    requestIresponsable: {type:String},


      // fi 2   alcance operacional
      opScopeOb1: {type:String},
      opScopeOb2: {type:String},
      opScopeOb3: {type:String},
      opScopeshow2: {type:String},
      opScopeshow3: {type:String},
      opScopestatus:{type: Boolean},
      opScoperesponsable: {type:String},


      
      // fi 3  Historia, Estado mecánico y survey de pozo actualizados
      historyOb1: {type:String},
      historyOb2: {type:String},
      historyOb3: {type:String},
      historyshow2: {type:String},
      historyshow3: {type:String},
      historystatus:{type: Boolean},
      historyresponsable: {type:String},


        // fi 4  Formato de planeación trabajo contrato MS3 - Sólo Ecopetrol
        paleationFOb1: {type:String},
        paleationFOb2: {type:String},
        paleationFOb3: {type:String},
        paleationFshow2: {type:String},
        paleationFshow3: {type:String},
        paleationFstatus:{type: Boolean},
        paleationFresponsable: {type:String},

           // fi 5  Definir si se requiere pruebas de laboratorio & QA/QC de química a inyectar
           laboratoryOb1: {type:String},
           laboratoryOb2: {type:String},
           laboratoryOb3: {type:String},
           laboratoryshow2: {type:String},
           laboratoryshow3: {type:String},
           laboratorystatus:{type: Boolean},
           laboratoryresponsable: {type:String},


           
           // fi 6  Layout de quipos con parámetros críticos a manejar (presión, caudal, consumo de energía, secuencia de flujo de fluidos, válvulas de controñ, etc)
           LayoutOb1: {type:String},
           LayoutOb2: {type:String},
           LayoutOb3: {type:String},
           Layoutshow2: {type:String},
           Layoutshow3: {type:String},
           Layoutstatus:{type: Boolean},
           Layoutresponsable: {type:String},


            
           // fi 7  Layout de quipos con parámetros críticos a manejar (presión, caudal, consumo de energía, secuencia de flujo de fluidos, válvulas de controñ, etc)
          //  LayoutOb1: {type:String},
          //  LayoutOb2: {type:String},
          //  LayoutOb3: {type:String},
          //  Layoutshow2: {type:String},
          //  Layoutshow3: {type:String},
          //  Layoutstatus:{type: Boolean},
          //  Layoutresponsable: {type:String},

    

          
                // fi 8   Condiciones de pozo ( presiones esperada en cabeza, presión de yacimiento, presión actual)
                fiWellConditionOb1: {type:String},
                fiWellConditionOb2: {type:String},
                fiWellConditionOb3: {type:String},
                fiWellConditionshow2: {type:String},
                fiWellConditionshow3: {type:String},
                fiWellConditionstatus:{type: Boolean},
                fiWellConditionresponsable: {type:String},


              // fi 9   Condiciciones del agua (temperatura, sólidos en ppm, grasas & aceites, salinidad, tamaño partícula sólidos)
                waterConditionOb1: {type:String},
                waterConditionOb2: {type:String},
                waterConditionOb3: {type:String},
                waterConditionshow2: {type:String},
                waterConditionshow3: {type:String},
                waterConditionstatus:{type: Boolean},
                waterConditionresponsable: {type:String},


                   // fi 10   Condiciones de agua inyectar(tamaño de particula, sólidos en ppm, otros)
                   waterCondition2Ob1: {type:String},
                   waterCondition2Ob2: {type:String},
                   waterCondition2Ob3: {type:String},
                   waterCondition2show2: {type:String},
                   waterCondition2show3: {type:String},
                   waterCondition2status:{type: Boolean},
                   waterCondition2responsable: {type:String},


                   
                   // fi 11   Confirmación de presencia detectada o potencial de H2S
                   fih2sOb1: {type:String},
                   fih2sOb2: {type:String},
                   fih2sOb3: {type:String},
                   fih2sshow2: {type:String},
                   fih2sshow3: {type:String},
                   fih2sstatus:{type: Boolean},
                   fih2sresponsable: {type:String},


                     // fi 12   Confirmación de presencia detectada o potencial de H2S
                    //  fih2sOb1: {type:String},
                    //  fih2sOb2: {type:String},
                    //  fih2sOb3: {type:String},
                    //  fih2sshow2: {type:String},
                    //  fih2sshow3: {type:String},
                    //  fih2sstatus:{type: Boolean},
                    //  fih2sresponsable: {type:String},


                     
                     // fi 12  Conexión a cabeza de pozo (tipo, tamaño, rosca, rating de presión)
                     conectionOb1: {type:String},
                     conectionOb2: {type:String},
                     conectionOb3: {type:String},
                     conectionshow2: {type:String},
                     conectionshow3: {type:String},
                     conectionstatus:{type: Boolean},
                     conectionresponsable: {type:String},


                    //  ---------------------------------
                    //  2. EVALUACIÓN DE RECURSOS CRÍTICOS 
                    //  ---------------------------------


                         
                     // fi 14  Selección de bombas para capacidad requerida de inyección (describa tipo, marca, tamaño, proveedor  y costo)
                     bombSelectionOb1: {type:String},
                     bombSelectionOb2: {type:String},
                     bombSelectionOb3: {type:String},
                     bombSelectionshow2: {type:String},
                     bombSelectionshow3: {type:String},
                     bombSelectionstatus:{type: Boolean},
                     bombSelectionresponsable: {type:String},

                      // fi 15  Selección de equipo auxiliar , unidad de filtrado, bombas centrífugas, frank tanks)(describa tipo, marcca, tamaño, proveedor y costo)
                     auxOb1: {type:String},
                     auxOb2: {type:String},
                     auxOb3: {type:String},
                     auxshow2: {type:String},
                     auxshow3: {type:String},
                     auxstatus:{type: Boolean},
                     auxresponsable: {type:String},


                      // fi 16  Layout de quipos Layout de equipos, viabilidad y procedimiento de Rig up . Definir parámetros críticos de cada componenter (presión, caudal, consumo de energía, secuencia de flujo de fluidos, válvulas de controñ, etc)
                      layoutOb1: {type:String},
                      layoutOb2: {type:String},
                      layoutOb3: {type:String},
                      layoutshow2: {type:String},
                      layoutshow3: {type:String},
                      layoutstatus:{type: Boolean},
                      layoutresponsable: {type:String},



                          // fi 17 pre inspección de la vía y la locación
                          preinspectionOb1: {type:String},
                          preinspectionOb2: {type:String},
                          preinspectionOb3: {type:String},
                          preinspectionshow2: {type:String},
                          preinspectionshow3: {type:String},
                          preinspectionstatus:{type: Boolean},
                          preinspectionresponsable: {type:String},


                          // fi 18 Verificación de estatus de manteamiento preventivo de cada unidad (MAPRE 1 & MAPRE 2)
                          mapreOb1: {type:String},
                          mapreOb2: {type:String},
                          mapreOb3: {type:String},
                          mapreshow2: {type:String},
                          mapreshow3: {type:String},
                          maprestatus:{type: Boolean},
                          mapreresponsable: {type:String},


                              // fi 20 Validación pruebas de potencia de bomba versus HP requeridos
                             validationOb1: {type:String},
                             validationOb2: {type:String},
                             validationOb3: {type:String},
                             validationshow2: {type:String},
                             validationshow3: {type:String},
                             validationstatus:{type: Boolean},
                             validationresponsable: {type:String},


                          // fi 21  Definir tipo, tamaño Y cantidad de generadores & planta estadios/luminarias. Típicamente  75 KVA 440 VOLT
                            generadoresOb1: {type:String},
                            generadoresOb2: {type:String},
                            generadoresOb3: {type:String},
                            generadoresshow2: {type:String},
                            generadoresshow3: {type:String},
                            generadoresstatus:{type: Boolean},
                            generadoresresponsable: {type:String},


           // fi 22   Funcionalidad del sistema de registro, adquisición y monitoreo de parámetros críticos operacionales. Definir los accesorios con los cuales se medirán
           systemOb1: {type:String},
           systemOb2: {type:String},
           systemOb3: {type:String},
           systemshow2: {type:String},
           systemshow3: {type:String},
           systemstatus:{type: Boolean},
           systemresponsable: {type:String},
                  
//---------------------
//-------PHASE 2 
//--------------------


//  1   intervalos  wl
intervOb1: {type:String},
intervOb2: {type:String},
intervOb3: {type:String},
intervshow2: {type:String},
intervshow3: {type:String},
intervstatus:{type: Boolean},
intervresponsable: {type:String},




//  2   intervalos  wl
densOb1: {type:String},
densOb2: {type:String},
densOb3: {type:String},
densshow2: {type:String},
densshow3: {type:String},
densstatus:{type: Boolean},
densresponsable: {type:String},


//  3    Tipo de carga a utilizar - Documentación de las cargas  wl
loadOb1: {type:String},
loadOb2: {type:String},
loadOb3: {type:String},
loadshow2: {type:String},
loadshow3: {type:String},
loadstatus:{type: Boolean},
loadresponsable: {type:String},



//  4    Tipo de cañón a utilizar 
gunsOb1: {type:String},
gunsOb2: {type:String},
gunsOb3: {type:String},
gunsshow2: {type:String},
gunsshow3: {type:String},
gunsstatus:{type: Boolean},
gunsresponsable: {type:String},




//  5 wl    Tipo de cañón a utilizar 
gunsOb1: {type:String},
gunsOb2: {type:String},
gunsOb3: {type:String},
gunsshow2: {type:String},
gunsshow3: {type:String},
gunsstatus:{type: Boolean},
gunsresponsable: {type:String},




//  5 wl    Tipo de cañón a utilizar 
gunsOb1: {type:String},
gunsOb2: {type:String},
gunsOb3: {type:String},
gunsshow2: {type:String},
gunsshow3: {type:String},
gunsstatus:{type: Boolean},
gunsresponsable: {type:String},





//  6 wl  Carriers
carriersOb1: {type:String},
carriersOb2: {type:String},
carriersOb3: {type:String},
carriersshow2: {type:String},
carriersshow3: {type:String},
carriersstatus:{type: Boolean},
carriersresponsable: {type:String},



//  7 wl  Conexión a cabeza de pozo 
headerCoOb1: {type:String},
headerCoOb2: {type:String},
headerCoOb3: {type:String},
headerCoshow2: {type:String},
headerCoshow3: {type:String},
headerCostatus:{type: Boolean},
headerCoresponsable: {type:String},



//  8 wl  Conexión a cabeza de pozo 
rigUpOb1: {type:String},
rigUpOb2: {type:String},
rigUpOb3: {type:String},
rigUpshow2: {type:String},
rigUpshow3: {type:String},
rigUpstatus:{type: Boolean},
rigUpresponsable: {type:String},



//  9 wl  Tamaño, longitud, cantidad  y rating de presión de lubricadores
sizeOb1: {type:String},
sizeOb2: {type:String},
sizeOb3: {type:String},
sizeshow2: {type:String},
sizeshow3: {type:String},
sizestatus:{type: Boolean},
sizeresponsable: {type:String},



//  10 wl   Detonadores  Documentación , ficha técnica , prueba de los detonadores , lote , antigüedad  (regla de 80% vida útil
detonatorOb1: {type:String},
detonatorOb2: {type:String},
detonatorOb3: {type:String},
detonatorshow2: {type:String},
detonatorshow3: {type:String},
detonatorstatus:{type: Boolean},
detonatorresponsable: {type:String},



//  11 wl   Poleas (condición)
pulleysOb1: {type:String},
pulleysOb2: {type:String},
pulleysOb3: {type:String},
pulleysshow2: {type:String},
pulleysshow3: {type:String},
pulleysstatus:{type: Boolean},
pulleysresponsable: {type:String},



//  12 wl   Cable: condición física, revisión de historial de pies recorridos & corte, longitud disponible y requerida
cableOb1: {type:String},
cablesOb2: {type:String},
cablesOb3: {type:String},
cableshow2: {type:String},
cableshow3: {type:String},
cablestatus:{type: Boolean},
cableresponsable: {type:String},



//  13 wl  paneles
panelsOb1: {type:String},
panelsOb2: {type:String},
panelsOb3: {type:String},
panelshow2: {type:String},
panelshow3: {type:String},
panelsstatus:{type: Boolean},
panelsresponsable: {type:String},





//  14 wl  Funcionalidad del sistema de registro, adquisición y monitoreo de parámetros críticos operacionales
registerOb1: {type:String},
registerOb2: {type:String},
registerOb3: {type:String},
registershow2: {type:String},
registershow3: {type:String},
registersstatus:{type: Boolean},
registerresponsable: {type:String},





//  15 wl  Cabeza de registro
headerLoginOb1: {type:String},
headerLoginOb2: {type:String},
headerLoginOb3: {type:String},
headerLoginshow2: {type:String},
headerLoginshow3: {type:String},
headerLoginstatus:{type: Boolean},
headerLoginresponsable: {type:String},


//  16 wl sl  Cabeza de registro
inyectionOb1: {type:String},
inyectionOb2: {type:String},
inyectionOb3: {type:String},
inyectionshow2: {type:String},
inyectionshow3: {type:String},
inyectionstatus:{type: Boolean},
inyectionresponsable: {type:String},

//  17 wl ct sl   Cabeza de registro
backUpOb1: {type:String},
backUpOb2: {type:String},
backUpOb3: {type:String},
backUpshow2: {type:String},
backUpshow3: {type:String},
backUpstatus:{type: Boolean},
backUpresponsable: {type:String},


//-----------------------------------
// <!--  preguntas de ct --> 
//--------------------------------


//  2  ct      Cálculos de materiales (química para gel y estimulaciones)
materialsOb1: {type:String},
materialsOb2: {type:String},
materialsOb3: {type:String},
materialsshow2: {type:String},
materialsshow3: {type:String},
materialsstatus:{type: Boolean},
materialsresponsable: {type:String},



//  3  ct     Cálculos y simulaciones intervenciones con nitrógeno 
nitrogenCalcsObservation: {type:String},
nitrogenCalcsStatus:{type: Boolean},





//  4  ct         Hoja de vida de tubería con fatiga/vida remanente actualizada
tubingOb1: {type:String},
tubingOb2: {type:String},
tubingOb3: {type:String},
tubingshow2: {type:String},
tubingshow3: {type:String},
tubingstatus:{type: Boolean},
materialsresponsable: {type:String},




//  6  ct             Registros de inspección periódica de equipo de control de presión cabeza de pozo
presionControlOb1: {type:String},
presionControlOb2: {type:String},
presionControlOb3: {type:String},
presionControlshow2: {type:String},
presionControlshow3: {type:String},
presionControlstatus:{type: Boolean},
presionControlresponsable: {type:String},


//  9  ct  Reglas de oro operaciones de CT
goldenRulesOb1: {type:String},
goldenRulesOb2: {type:String},
goldenRulesOb3: {type:String},
goldenRulesshow2: {type:String},
goldenRulesshow3: {type:String},
goldenRulesstatus:{type: Boolean},
goldenRulesresponsable: {type:String},


//  11  ct   Pruebas de laboratorio & QA/QC de fluidos
QAQCOb1: {type:String},
QAQCOb2: {type:String},
QAQCOb3: {type:String},
QAQCshow2: {type:String},
QAQCshow3: {type:String},
QAQCstatus:{type: Boolean},
QAQCresponsable: {type:String},




//  12  ct    Equipo de retornos (cliente/propio) es el adecuado para manejo de gas y nitrógeno
returnOb1: {type:String},
returnOb2: {type:String},
returnOb3: {type:String},
returnshow2: {type:String},
returnshow3: {type:String},
returnstatus:{type: Boolean},
returnresponsable: {type:String},



//  13  ct    Medidas de prevención/mitigación para manejo/bombeo de inflamables o corrosivos

preventionMedsOb1: {type:String},
preventionMedsOb2: {type:String},
preventionMedsOb3: {type:String},
preventionMedsshow2: {type:String},
preventionMedsshow3: {type:String},
preventionMedsstatus:{type: Boolean},
preventionMedsresponsable: {type:String},




//  14  ct     Planes/procedimientos de contingencia
continPlansOb1: {type:String},
continPlansOb2: {type:String},
continPlansOb3: {type:String},
continPlansshow2: {type:String},
continPlansshow3: {type:String},
continPlansstatus:{type: Boolean},
continPlansresponsable: {type:String},

//  15  ct        Cálculos para activar desconectores 
connectionsOb1: {type:String},
connectionsOb2: {type:String},
connectionsOb3: {type:String},
connectionsshow2: {type:String},
connectionsshow3: {type:String},
connectionsstatus:{type: Boolean},
connectionsresponsable: {type:String},




//-----------------------------
//   <!--  preguntas de sl -->
//-----------------------------

//  1 sl         Condición de poleas y carretos 
pulleysOb1: {type:String},
pulleysOb2: {type:String},
pulleysOb3: {type:String},
pulleysshow2: {type:String},
pulleysshow3: {type:String},
pulleysstatus:{type: Boolean},
pulleysresponsable: {type:String},



//  2 sl            Cable: condición física, revisión de historial de pies recorridos & corte, longitud disponible y requerida
cableOb1: {type:String},
cableOb2: {type:String},
cableOb3: {type:String},
cableshow2: {type:String},
cableshow3: {type:String},
cablestatus:{type: Boolean},
cableresponsable: {type:String},



//  2 sl            Cable: condición física, revisión de historial de pies recorridos & corte, longitud disponible y requerida
cableOb1: {type:String},
cableOb2: {type:String},
cableOb3: {type:String},
cableshow2: {type:String},
cableshow3: {type:String},
cablestatus:{type: Boolean},
cableresponsable: {type:String},



//--------------------------
//-----------WT-------------
//-------------------------

//  2 wt       Check list de preinspección de unidades (MAPRE 1)
checkMapre1Ob1: {type:String},
checkMapre1Ob2: {type:String},
checkMapre1Ob3: {type:String},
checkMapre1show2: {type:String},
checkMapre1show3: {type:String},
checkMapre1status:{type: Boolean},
checkMapre1sponsable: {type:String},


//  3 wt       Check list de preinspección de unidades (MAPRE 1)
checkMapre2Ob1: {type:String},
checkMapre2Ob2: {type:String},
checkMapre2Ob3: {type:String},
checkMapre2show2: {type:String},
checkMapre2show3: {type:String},
checkMapre2status:{type: Boolean},
checkMapre2sponsable: {type:String},



//  4 wt   Selección de accesorios críticos
criticalSelOb1: {type:String},
criticalSelOb2: {type:String},
criticalSelOb3: {type:String},
criticalSelshow2: {type:String},
criticalSelshow3: {type:String},
criticalSelstatus:{type: Boolean},
criticalSelresponsable: {type:String},



//  5 wt   Selección de accesorios críticos
criticalAcOb1: {type:String},
criticalAcOb2: {type:String},
criticalAcOb3: {type:String},
criticalAcshow2: {type:String},
criticalAcshow3: {type:String},
criticalAcstatus:{type: Boolean},
criticalAcresponsable: {type:String},

//  6 wt   Caseta laboratorio
laboratoryCastOb1: {type:String},
laboratoryCastOb2: {type:String},
laboratoryCastOb3: {type:String},
laboratoryCastshow2: {type:String},
laboratoryCastshow3: {type:String},
laboratoryCaststatus:{type: Boolean},
laboratoryCastresponsable: {type:String},



//  7 wt   Caseta laboratorio
laboratoryCastOb1: {type:String},
laboratoryCastOb2: {type:String},
laboratoryCastOb3: {type:String},
laboratoryCastshow2: {type:String},
laboratoryCastshow3: {type:String},
laboratoryCaststatus:{type: Boolean},
laboratoryCastresponsable: {type:String},


//  8 wt   Pre inspección de la vía y visita a locación
preinsLocOb1: {type:String},
preinsLocOb2: {type:String},
preinsLocOb3: {type:String},
preinsLocshow2: {type:String},
preinsLocshow3: {type:String},
preinsLocstatus:{type: Boolean},
preinsLocresponsable: {type:String},



//  9 wt   Programa operacional validado internamente y aprobado por cliente
operationalProgramOb1: {type:String},
operationalProgramOb2: {type:String},
operationalProgramOb3: {type:String},
operationalProgramshow2: {type:String},
operationalProgramshow3: {type:String},
operationalProgramstatus:{type: Boolean},
operationalProgramresponsable: {type:String},






//  10 wt  Evaluación de equipo auxiliar y de contratistas
auxEvalOb1: {type:String},
auxEvalOb2: {type:String},
auxEvalOb3: {type:String},
auxEvalshow2: {type:String},
auxEvalshow3: {type:String},
auxEvalstatus:{type: Boolean},
auxEvalresponsable: {type:String},




//<!--  pregunta 12 wt  Manejo de químicos -->
chemistryOb1: {type:String},
chemistryOb2: {type:String},
chemistryOb3: {type:String},
chemistryshow2: {type:String},
chemistryshow3: {type:String},
chemistrystatus:{type: Boolean},
chemistryresponsable: {type:String},


//-------------------
// preguntas de fi 
//-------------------

// fi  1Selección de bombas para capacidad requerida de inyección (describa tipo, marca, tamaño, proveedor  y costo)
bombOb1: {type:String},
bombOb2: {type:String},
bombOb3: {type:String},
bombshow2: {type:String},
bombshow3: {type:String},
bombstatus:{type: Boolean},
bombresponsable: {type:String},



//  fi 2 Selección de equipo auxiliar , unidad de filtrado, bombas centrífugas, frank tanks)(describa tipo, marcca, tamaño, proveedor y costo)
auxToolOb1: {type:String},
auxToolOb2: {type:String},
auxToolOb3: {type:String},
auxToolshow2: {type:String},
auxToolshow3: {type:String},
auxToolstatus:{type: Boolean},
auxToolresponsable: {type:String},



//  fi 3     Layout de quipos Layout de equipos, viabilidad y procedimiento de Rig up . Definir parámetros críticos de cada componenter (presión, caudal, consumo de energía, secuencia 
layoutOb1: {type:String},
layoutOb2: {type:String},
layoutOb3: {type:String},
layoutshow2: {type:String},
layoutshow3: {type:String},
layoutstatus:{type: Boolean},
layoutresponsable: {type:String},



//  fi 4 Verificación de estatus de manteamiento preventivo de cada unidad (MAPRE 1 & MAPRE 2) 
mapreVerifyOb1: {type:String},
mapreVerifyOb2: {type:String},
mapreVerifyOb3: {type:String},
mapreVerifyshow2: {type:String},
mapreVerifyshow3: {type:String},
mapreVerifystatus:{type: Boolean},
mapreVerifyresponsable: {type:String},



//  fi 5 fi Validación pruebas de potencia de bomba versus HP requeridos
validationOb1: {type:String},
validationOb2: {type:String},
validationOb3: {type:String},
validationshow2: {type:String},
validationshow3: {type:String},
validationstatus:{type: Boolean},
validationresponsable: {type:String},


//  fi  6 fi Definir tipo, tamaño Y cantidad de generadores & planta estadios/luminarias. Típicamente  75 KVA 440 VOLT 
generatorOb1: {type:String},
generatorOb2: {type:String},
generatorOb3: {type:String},
generatorshow2: {type:String},
generatorshow3: {type:String},
generatorstatus:{type: Boolean},
generatorresponsable: {type:String},


//  fi 8 fi Definir tipo y cantidad de equipo de backup (bombas de alta presión, bombas centrífugas, etc) 
loginSystemOb1: {type:String},
loginSystemOb2: {type:String},
loginSystemOb3: {type:String},
loginSystemshow2: {type:String},
loginSystemshow3: {type:String},
loginSystemstatus:{type: Boolean},
loginSystemresponsable: {type:String},


// 9 fi  Listado validado bajo guia de Accesorios de lineas de alta y baja 
fiListOb1: {type:String},
fiListOb2: {type:String},
fiListOb3: {type:String},
fiListshow2: {type:String},
fiListshow3: {type:String},
fiListstatus:{type: Boolean},
fiListresponsable: {type:String},


//  fi  10 fi Inpecciones/certificaciones de cada accesoiro disponibles y al dia-
fiInspectionOb1: {type:String},
fiInspectionOb2: {type:String},
fiInspectionOb3: {type:String},
fiInspectionshow2: {type:String},
fiInspectionshow3: {type:String},
fiInspectionstatus:{type: Boolean},
fiInspectionresponsable: {type:String},





//  fi  11 fi  Líneas de alta presión con inspección al día.  Registrar fecha de siguiente inspección  -->
fiLineOb1: {type:String},
fiLineOb2: {type:String},
fiLineOb3: {type:String},
fiLineshow2: {type:String},
fiLineshow3: {type:String},
fiLinestatus:{type: Boolean},
fiLineresponsable: {type:String},


//  fi  pregunta 12 fi  Equipo de izaje (grúa, brazo hidráulico, LMI) 
filiftingOb1: {type:String},
filiftingOb2: {type:String},
filiftingOb3: {type:String},
filiftingshow2: {type:String},
filiftingshow3: {type:String},
filiftingstatus:{type: Boolean},
filiftingresponsable: {type:String},




//  fi pregunta 13 fi aparejos  (eslingas, grilletes, puntos de izaje, otros)   -->
riggingOb1: {type:String},
riggingOb2: {type:String},
riggingOb3: {type:String},
riggingshow2: {type:String},
riggingshow3: {type:String},
riggingstatus:{type: Boolean},
riggingresponsable: {type:String},


//  14 fi Sensores de presión (cabeza y circulación) con calibración/certificación (barton) 
pressureOb1: {type:String},
pressureOb2: {type:String},
pressureOb3: {type:String},
pressureshow2: {type:String},
pressureshow3: {type:String},
pressurestatus:{type: Boolean},
pressureresponsable: {type:String},



//  fi pregunta 15 fi  medidores de flujo (tipo, tamaño, rango de operación) -
flowmeterOb1: {type:String},
flowmeterOb2: {type:String},
flowmeterOb3: {type:String},
flowmetershow2: {type:String},
flowmetershow3: {type:String},
flowmeterstatus:{type: Boolean},
flowmeterresponsable: {type:String},




//  regunta 16 fi Medidor de tasa de bombeo (MC II) 
RateMeterOb1: {type:String},
RateMeterOb2: {type:String},
RateMeterOb3: {type:String},
RateMetershow2: {type:String},
RateMetershow3: {type:String},
RateMeterstatus:{type: Boolean},
RateMeterresponsable: {type:String},

//  regunta 17 fi Dumpers
dumpersOb1: {type:String},
dumpersOb2: {type:String},
dumpersOb3: {type:String},
dumpersshow2: {type:String},
dumpersshow3: {type:String},
dumpersstatus:{type: Boolean},
dumpersresponsable: {type:String},



//--------------------------
//-----------phase 3 -------------
//-------------------------

// pregunta 1 wt ct  Líneas de alta presión con inspección al día.  Registrar fecha de siguiente inspección
highPressureOb1: {type:String},
highPressureOb2: {type:String},
highPressureOb3: {type:String},
highPressureshow2: {type:String},
highPressureshow3: {type:String},
highPressurestatus:{type: Boolean},
highPressureresponsable: {type:String},



//  pregunta 2 wt wl sl ct   Equipo de izaje (grúa, brazo hidráulico, LMI) -->

hoistingOb1: {type:String},
hoistingOb2: {type:String},
hoistingOb3: {type:String},
hoistingshow2: {type:String},
hoistingshow3: {type:String},
hoistingstatus:{type: Boolean},
hoistingresponsable: {type:String},


// -  pregunta 3 wt wl sl ct    aparejos  (eslingas, grilletes, puntos de izaje, otros)  -->


riggingOb1: {type:String},
riggingOb2: {type:String},
riggingOb3: {type:String},
riggingshow2: {type:String},
riggingshow3: {type:String},
riggingstatus:{type: Boolean},
riggingresponsable: {type:String},






//    <!--  pregunta 4 wt wl sl ct  Sensores de presión (cabeza y circulación) con calibración/certificación -->
presionSOb1: {type:String},
presionSOb2: {type:String},
presionSOb3: {type:String},
presionSgshow2: {type:String},
presionSshow3: {type:String},
presionSstatus:{type: Boolean},
presionSresponsable: {type:String},





//  pregunta 5 wt wl sl ct   Equipo de izaje (grúa, brazo hidráulico, LMI) -->
headInyectionOb1: {type:String},
headInyectionOb2: {type:String},
headInyectionOb3: {type:String},
headInyectionshow2: {type:String},
headInyectionshow3: {type:String},
headInyectionstatus:{type: Boolean},
headInyectionresponsable: {type:String},



//  pregunta 6  <!--  pregunta 6  ct Martin Decker bomba -->
martinDeckerOb1: {type:String},
martinDeckerOb2: {type:String},
martinDeckernOb3: {type:String},
martinDeckershow2: {type:String},
martinDeckershow3: {type:String},
martinDeckerstatus:{type: Boolean},
martinDeckerresponsable: {type:String},





//         <!--  pregunta 7  wl sl ct Encoder de profundidad-->
encoderOb1: {type:String},
encoderOb2: {type:String},
encoderOb3: {type:String},
encodershow2: {type:String},
encodershow3: {type:String},
encoderstatus:{type: Boolean},
encoderresponsable: {type:String},




//   <!--  pregunta 8  wl sl ct Contador mecánico-->
mechCounterOb1: {type:String},
mechCounterOb2: {type:String},
mechCounterOb3: {type:String},
mechCountershow2: {type:String},
mechCountershow3: {type:String},
mechCounterstatus:{type: Boolean},
mechCounterresponsable: {type:String},


//  <!--  pregunta 9 wt wl sl ct   Conexión a cabeza de pozo (flanchada/roscada)  -->
headerConectionOb1: {type:String},
headerConectionOb2: {type:String},
headerConectionOb3: {type:String},
headerConectionshow2: {type:String},
headerConectionshow3: {type:String},
headerConectionstatus:{type: Boolean},
headerConectionresponsable: {type:String},



//          <!--  pregunta 10  wl sl ct  BOP  & risers  -->
BOPOb1: {type:String},
BOPOb2: {type:String},
BOPOb3: {type:String},
BOPshow2: {type:String},
BOPshow3: {type:String},
BOPstatus:{type: Boolean},
BOPresponsable: {type:String},




//           <!--  pregunta 11  wt ct  Choke manifold & conexión a cabeza de pozo   -->
chokeManifoldOb1: {type:String},
chokeManifoldOb2: {type:String},
chokeManifoldOb3: {type:String},
chokeManifoldshow2: {type:String},
chokeManifoldshow3: {type:String},
chokeManifoldstatus:{type: Boolean},
chokeManifoldresponsable: {type:String},



//              <!--  pregunta 12  wl sl ct  Stuffing box/stripper   -->
otherOb1: {type:String},
otherOb2: {type:String},
otherOb3: {type:String},
othershow2: {type:String},
othershow3: {type:String},
otherstatus:{type: Boolean},
otherresponsable: {type:String},



 //  <!--  pregunta 13 t wl  ct  Verificado y aprobado al nivel determinado en el score    --> 
scoreVerificationOb1: {type:String},
scoreVerificationOb2: {type:String},
scoreVerificationOb3: {type:String},
scoreVerificationshow2: {type:String},
scoreVerificationshow3: {type:String},
scoreVerificationstatus:{type: Boolean},
scoreVerificationresponsable: {type:String},




 //      <!-- -------------------------------- -->
 //<!-- -------  pregutnas de fi ------- -->
 ///<!-- -------------------------------- -->
 //  pregunta 1 fi Programa operacional validado internamente y aprobado por cliente (incluye paso a paso para asegurar calidad de agua a inyectar )    -->
operationalProgramOb1: {type:String},
operationalProgramOb2: {type:String},
operationalProgramOb3: {type:String},
operationalProgramshow2: {type:String},
operationalProgramshow3: {type:String},
operationalProgramstatus:{type: Boolean},
operationalProgramresponsable: {type:String},




 //     <!--  pregunta 2 fi Requerimientos de logítisca para cargue, movilización y descargue de equipos (grua, montacargas, camabajaas, camión para accesorios)    -->
 logisticReqOb1: {type:String},
 logisticReqOb2: {type:String},
 logisticReqOb3: {type:String},
 logisticReqshow2: {type:String},
 logisticReqshow3: {type:String},
 logisticReqstatus:{type: Boolean},
 logisticReqresponsable: {type:String},



 
 //        <!--  pregunta 3 fiRevisión de Reglas de oro operaciones de bombeo    -->
goldenRulesRevOb1: {type:String},
goldenRulesRevOb2: {type:String},
goldenRulesRevOb3: {type:String},
goldenRulesRevshow2: {type:String},
goldenRulesRevshow3: {type:String},
goldenRulesRevstatus: {type: Boolean},
goldenRulesRevresponsable: {type:String},



 //      <!--  pregunta 5 fi Planes/procedimientos de contingencia   -->
ficontinPlansOb1: {type:String},
ficontinPlansOb2: {type:String},
ficontinPlansOb3: {type:String},
ficontinPlansshow2: {type:String},
ficontinPlansshow3: {type:String},
ficontinPlansstatus: {type: Boolean},
ficontinPlansresponsable: {type:String},



 //   <!--  pregunta 6 fi Planes/procedimientos de contingencia (HSE/SQ)   -->>
 HseqficontinPlansOb1: {type:String},
 HseqficontinPlansOb2: {type:String},
 HseqficontinPlansOb3: {type:String},
 HseqficontinPlansshow2: {type:String},
 HseqficontinPlansshow3: {type:String},
 HseqficontinPlansstatus: {type: Boolean},
 HseqficontinPlansresponsable: {type:String},




 
 // <!--  pregunta 7 fi validación de miembros de cuadrilla . Requiere supervisor?   -->
teamValidationOb1: {type:String},
teamValidationOb2: {type:String},
teamValidationsOb3: {type:String},
teamValidationshow2: {type:String},
teamValidationshow3: {type:String},
teamValidationstatus: {type: Boolean},
teamValidationresponsable: {type:String},



 // <!--   <!--  pregunta 8 fi Evaluación y contratación de persomal auxiliar y de comunidades o terceros   -->
auxTeamOb1: {type:String},
auxTeamOb2: {type:String},
auxTeamOb3: {type:String},
auxTeamshow2: {type:String},
auxTeamshow3: {type:String},
auxTeamstatus: {type: Boolean},
auxTeamresponsable: {type:String},




//<!--  pregunta 9 fi Certificaciones HSEQ & cliente a personal propio de y de comunidad  -->
hseqCertificationOb1: {type:String},
hseqCertificationOb2: {type:String},
hseqCertificationOb3: {type:String},
hseqCertificationshow2: {type:String},
hseqCertificationshow3: {type:String},
hseqCertificationstatus: {type: Boolean},
hseqCertificationresponsable: {type:String},




//<!--  pregunta 10 fi Certificaciones HSEQ & cliente a personal propio de y de comunidad  -->
hseqCertificationOb1: {type:String},
hseqCertificationOb2: {type:String},
hseqCertificationOb3: {type:String},
hseqCertificationshow2: {type:String},
hseqCertificationshow3: {type:String},
hseqCertificationstatus: {type: Boolean},
hseqCertificationresponsable: {type:String},


//<!--  pregunta  6.1 wt Líneas de alta presión con inspección al día.  Registrar fecha de siguiente inspecció  -->
hpLineOb1: {type:String},
hpLineOb2: {type:String},
hpLineOb3: {type:String},
hpLineshow2: {type:String},
hpLine: {type:String},
hpLinestatus: {type: Boolean},
hpLineresponsable: {type:String},


//<!--<!--  pregunta 6.2 wt Equipo de izaje (grúa, brazo hidráulico, LMI)  -->
// hpLineOb1: {type:String},
// hpLineOb2: {type:String},
// hpLineOb3: {type:String},
// hpLineshow2: {type:String},
// hpLine: {type:String},
// hpLinestatus: {type: Boolean},
// hpLineresponsable: {type:String},



//<!                                         <!--  pregunta 6.3 wt Sensores de presión (cabeza y circulación) con calibración/certificación  -->
pressionsOb1: {type:String},
pressionsOb2: {type:String},
pressionsOb3: {type:String},
pressionsshow2: {type:String},
pressionsstatus: {type: Boolean},
pressionsresponsable: {type:String},


//<!   pregunta 6.4 wt Cargadero  -->
chargerOb1: {type:String},
chargerOb2: {type:String},
chargerOb3: {type:String},
chargershow2: {type:String},
chargerstatus: {type: Boolean},
chargerresponsable: {type:String},




//<!        <!--  pregunta 6.5 wt  Luminarias  -->
luminariesOb1: {type:String},
luminariesOb2: {type:String},
luminariesOb3: {type:String},
luminariesshow2: {type:String},
luminariesstatus: {type: Boolean},
luminariesresponsable: {type:String},




//<!        <!--  pregunta 6.5 wt  Luminarias  -->
wellheadConnectionOb1: {type:String},
wellheadConnectionOb2: {type:String},
wellheadConnectionOb3: {type:String},
wellheadConnectionshow2: {type:String},
wellheadConnectionstatus: {type: Boolean},
wellheadConnectionresponsable: {type:String},





//<!        <!--  pregunta 6.5 wt  Luminarias  -->
other65Ob1: {type:String},
other65Ob2: {type:String},
other65Ob3: {type:String},
other65show2: {type:String},
other65status: {type: Boolean},
other65responsable: {type:String},



//--------------------------
//----------fin -phase 3 -------------
//-------------------------







//  ---------------------------------
// PHASE 4 de FI 
//  ---------------------------------

//<!        <!--  pregunta 4.1 fi  Camioneta  -->
vanOb1: {type:String},
vanOb2: {type:String},
vanOb3: {type:String},
vanshow2: {type:String},
vanstatus: {type: Boolean},
vanresponsable: {type:String},

//<!        <!--  pregunta 4.2 fi  FRAC TANK 500 BLS  -->
frackTankOb1: {type:String},
frackTankOb2: {type:String},
frackTankOb3: {type:String},
frackTankshow2: {type:String},
frackTankstatus: {type: Boolean},
frackTankresponsable: {type:String},

//<!        <!--  pregunta 4.3 fi  TANQUE DE ABASTECIMIENTO DE COMBUSTIBLE X 3000 GL CON SISTEMA DE AUTOCONTENIDO  -->
cateringTankOb1: {type:String},
cateringTankOb2: {type:String},
cateringTankOb3: {type:String},
cateringTankshow2: {type:String},
cateringTankstatus: {type: Boolean},
cateringTankresponsable: {type:String},

//<!  pregunta 4.4 fi  UNIDAD DE FILTRADO DUAL HI FLOW. FILTER BACK.  -->
dualFilterOb1: {type:String},
dualFilterOb2: {type:String},
dualFilterOb3: {type:String},
dualFiltershow2: {type:String},
dualFiltershow3: {type:String},
dualFilterstatus: {type: Boolean},
dualFilterresponsable: {type:String},

//<!  pregunta 4.5 fi  4 FILTROS HI FLOW. CADA 24 HORAS. PRESION DISEÑO 150 PSI.  -->
hiFlowOb1: {type:String},
hiFlowOb2: {type:String},
hiFlowOb3: {type:String},
hiFlowshow2: {type:String},
hiFlowshow3: {type:String},
hiFlowstatus: {type: Boolean},
hiFlowresponsable: {type:String},

//<!  pregunta 4.6 fi  DATA HEADER 3" CEDULA 40 TOMA MUESTRA DE 3".  -->
dataHeaderOb1: {type:String},
dataHeaderOb2: {type:String},
dataHeaderOb3: {type:String},
dataHeadershow2: {type:String},
dataHeadershow3: {type:String},
dataHeaderstatus: {type: Boolean},
dataHeaderresponsable: {type:String},

//<!  pregunta 4.7 fi  BARTON CON SOPORTE Y MANIFOLD DE PRESION ( REGISTRO DE PRESIÓN ).  -->
bartonManifoldOb1: {type:String},
bartonManifoldOb2: {type:String},
bartonManifoldOb3: {type:String},
bartonManifoldshow2: {type:String},
bartonManifoldshow3: {type:String},
bartonManifoldstatus: {type: Boolean},
bartonManifoldresponsable: {type:String},


//<!  pregunta 4.8 fi  CASETA CON VENTANA AIRE ACONDICIONADO 10 FT PIZARRA , SILLAS CON DOBLE PUESTO DE TRABAJO.  -->
cabinOb1: {type:String},
cabinOb2: {type:String},
cabinOb3: {type:String},
cabinshow2: {type:String},
cabinshow3: {type:String},
cabinstatus: {type: Boolean},
cabinresponsable: {type:String},


//<!  pregunta 4.9 fi  TABLERO DE DISTRIBUCION ELECTRICO PARA CASETA, 3 BOMBAS DE 20 HP .C  -->
cabinBoardOb1: {type:String},
cabinBoardOb2: {type:String},
cabinBoardOb3: {type:String},
cabinBoardshow2: {type:String},
cabinBoardshow3: {type:String},
cabinBoardstatus: {type: Boolean},
cabinBoardresponsable: {type:String},



//<!  pregunta 4.10 fi  BOMBA CENTRIFUGA SUMMIT 2196 30 HP 440 VOLT (PARA UNIDAD DE FILTRADO)  -->
centrifigeBombOb1: {type:String},
centrifigeBombOb2: {type:String},
centrifigeBombOb3: {type:String},
centrifigeBombshow2: {type:String},
centrifigeBombshow3: {type:String},
centrifigeBombstatus: {type: Boolean},
centrifigeBombresponsable: {type:String},

//<!  pregunta 4.11 fi BOMBA CENTRIFUGA IHM 20 HP 440 VOLT (PARA TRASIEGO DE TANQUE)  -->
// centrifigeBomb20Ob1: {type:String},
// centrifigeBomb20Ob2: {type:String},
// centrifigeBomb20Ob3: {type:String},
// centrifigeBomb20show2: {type:String},
// centrifigeBomb20show3: {type:String},
// centrifigeBomb20status: {type: Boolean},
// centrifigeBomb20responsable: {type:String},

//<!  pregunta 4.11 fi BOMBA CENTRIFUGA IHM 20 HP 440 VOLT (PARA TRASIEGO DE TANQUE)  -->
centrifigeBomb20Ob1: {type:String},
centrifigeBomb20Ob2: {type:String},
centrifigeBomb20Ob3: {type:String},
centrifigeBomb20show2: {type:String},
centrifigeBomb20show3: {type:String},
centrifigeBomb20status: {type: Boolean},
centrifigeBomb20responsable: {type:String},


// pregunta 4.12 fi BOMBA CENTRIFUGA TIPO TORNILLO NEMO N70 1750 RPM 15 HP 440 VOLT   OPCION A (INYECCION DE BOMBA TRIPLEX) -->
centrifigeBombN70Ob1: {type:String},
centrifigeBombN70Ob2: {type:String},
centrifigeBombN70Ob3: {type:String},
centrifigeBombN70show2: {type:String},
centrifigeBombN70show3: {type:String},
centrifigeBombN70status: {type: Boolean},
centrifigeBombN70responsable: {type:String},

//  --------------------------------
// FIN PHASE 4 de FI 
//  ---------------------------------


StuffingOb1: {type:String},
Stuffingstatus: {type:Boolean},

CabinWeightStatus: {type:Boolean},
CabinWeightObservacion: {type:String}, 

});


 


module.exports = mongoose.model ('workPreparation', workPreparationSchema)


