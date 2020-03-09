const mongoose = require('mongoose');
const { Schema } = mongoose;

const iroSchema = new Schema 
 ({
   
    creatorId:{type:String},
    status:{type:Number},
    dateOfCreated:{type:String}, 
    observations: {type:String}, 
    jobNumber:{type:String}, 
    aprobatorName:{type:String}, 
    aprobatorId:{type:String}, 
    aprobation:{type:Boolean}, 
    aprobatorRole:{type:String},
    riskIndex:{type:String}, 
    managementId:{type:String},

    //  ¿Se ha completado una inspección del sitio del pozo en la locacion / taladro, o el cliente ha proporcionado detalles de la locacion equivalentes para garantizar la selección correcta de los equipos?
    locationInspectionO:{type:String}, 
    locationInspectionT:{type:Boolean}, 
    locationInspectionR:{type:String}, 

    //  ¿El objetivo del trabajo ha sido claramente definido y acordado con el cliente y la información provista es suficiente y confiable para completar el diseño del trabajo?
    jobObjO:{type:String}, 
    jobObjT:{type:Boolean}, 
    jobObjR:{type:String}, 

    //   ¿Se ha preparado un programa de trabajo que incluya la historia del pozo, la información del pozo, las presiones operativas, los resultados del software de diseño, el esquema detallado del pozo, el diagrama BHA y el procedimiento operacional del trabajo? 3
    workProgramO:{type:String}, 
    workProgramT:{type:Boolean}, 
    workProgramR:{type:String}, 


    //   ¿El programa de trabajo ha sido revisado por un par (es) con un nivel adecuado de experiencia y aprobado por el nivel adecuado de gerencia de línea / Excelencia y el cliente?
    workProgram2O:{type:String}, 
    workProgram2T:{type:Boolean}, 
    workProgram2R:{type:String}, 
    
    //  Si hay contratistas involucrados, ¿los límites y responsabilidades están bien definidos y acordados con el cliente?
    contractorsO:{type:String}, 
    contractorsT:{type:Boolean}, 
    contractorsR:{type:String}, 

    //¿Hay pescados, escombros o daños mecánicos sospechosos en el pozo?
    fishO:{type:String}, 
    fishT:{type:Boolean},
    fishR:{type:String}, 


    // ¿Es esto una operación de cementación o estimulación a través del CT?
    cementationO:{type:String}, 
    cementationT:{type:Boolean}, 
    cementationR:{type:String}, 


    // ¿El CT se va a usar en un ambiente corrosivo (ácido, H2S, CO2, rico en oxígeno), erosivo o abrasivo? 
    corrosiveO:{type:String}, 
    corrosiveT:{type:Boolean},
    corrosiveR:{type:String}, 

    //¿ Si es trabajo crítico se ha revisado con gerencia los requisitos de Preparación y Planeación?
    preparationO:{type:String},
    preparationT:{type:Boolean},
    preparationR:{type:String}, 


   //  ¿ El Sup. Del trabajo , Operador de CT y operadores de bombas han realizado trabajos similares y/o tienen la competencia  la Gerencia de la Linea? 
    similarWorkO:{type:String},
    similarWorkT:{type:Boolean},
    similarWorkR:{type:String},


    //¿ La cuadrilla esta al corriente con todos los procedimientos aplicables de Lupatech y certificaciones HSEQ?
    proceduresO:{type:String},
    proceduresT:{type:Boolean},
    proceduresR:{type:String},


    //¿Hay un miembro de la cuadrilla competente en el armado (Rig Up), la operación y MAPRE-I de cada pieza de equipo y herramientas de fondo de pozo (BHA) que se utilizarán en este trabajo?
    rigUpO:{type:String},
    rigUpT:{type:Boolean},
    rigUpR:{type:String},

    //  ¿El tamaño de la cuadrilla es suficiente y cumple con los requerimientos contractuales y legales para operar cada equipo y cumplir con prácticas de la industria & procedimientos Lupatech?
    teamSizeO:{type:String},
    teamSizeT:{type:Boolean},
    teamSizeR:{type:String}, 


    // Para operaciones de varios segmentos, incluidos contratistas (cemento, estimulación, registro electrico, canoneo, herramientas de fondo de Pozo, Well Testing, etc), ¿se ha identificado el Sup. de Trabajo general, se han definido las responsabilidades y las líneas de comunicación con el cliente?
    operationRespO:{type:String},
    operationRespT:{type:Boolean},
    operationRespR:{type:String},

    // ¿El equipo seleccionado está preparado y actualizado en MAPRE 1 y MAPRE 2? (incluye equipo auxiliar) 
    mapreActualizationO:{type:String},
    mapreActualizationT:{type:Boolean},
    mapreActualizationR:{type:String},


    //  ¿El equipo de control de Presion y accesorios de alta presion está al corriente en inspección, certificacion y pruebas de presion según requerimientos internos y de clientes ? 
    pressureEquipentO:{type:String},
    pressureEquipentT:{type:Boolean},
    pressureEquipentR:{type:String},


    // ¿Está  el sistema de registro, adquisicón de parámetros criticos operacionales instalado y funcional?
    loginSystemO:{type:String},
    loginSystemT:{type:Boolean},
    loginSystemR:{type:String},

     // ¿Se ha verificado la calibración de la celda de carga del cabezal del inyector utilizando el verificador de peso en los últimos 12 meses y se ha calibrado dentro de los ultimos 24 meses? 
     calibrationVerificationO:{type:String},
     calibrationVerificationT:{type:Boolean},
     calibrationVerificationR:{type:String},


    //  ¿La tuberia de CT ha: a) tuvo una falla previa, b) tiene daño conocido, c) se utilizó anteriormente más allá de 80% de vida util ?  
     tubingO:{type:String},
     tubingT:{type:Boolean},
     tubingR:{type:String},


     
    //  ¿Se han revisado los límites operativos, las clasificaciones y el tamaño (longitud, OD, ID) de las herramientas de fondo de pozo (incluidas las alquiladas a terceros)?
    operativeLimitsO:{type:String},
    operativeLimitsT:{type:Boolean},
    operativeLimitsR:{type:String},


    //    El supervisor del trabajo ha revisado y confirma que se cumplen con las reglas de Oro de Coiled Tubing?
    goldenRulesO:{type:String},
    goldenRulesT:{type:Boolean},
    goldenRulesR:{type:String},


    // ¿Los requerimientos claves del trabajo han sido revisados por el el supervisor de cada turno/Jefe de línea y el programa de Trabajo ha sido aprobado por el cliente?
    critReqO:{type:String},
    critReqT:{type:Boolean},
    critReqR:{type:String},


    
    //  ¿El Sup. Del Trabajo entiende su responsabilidad de detener el trabajo por riesgos de calidad presentes y la necesidad de realizar Manejo de Cambio cuando cambian las condiciones en el pozo?
    supRespO:{type:String},
    supRespT:{type:Boolean},
    supRespR:{type:String},


    // ¿Se han cargado piezas de repuesto y consumibles para minimizar el NPT en la locacion a < 4 horas?
    nptMinO:{type:String},
    nptMinT:{type:Boolean},
    nptMinR:{type:String},


    ///    Cuando la locacion del pozo está alejado de la costa o en area remota, ¿se puede reemplazar el equipo, incluida el carreto de tubería flexible, (teniendo en cuenta las limitaciones logísticas) con un NPT resultante < 48 horas? 
    wellLocationO:{type:String},
    wellLocationT:{type:Boolean},
    wellLocationR:{type:String},


    aprobationLevel:{type:Number} ,
  // aprobationLevel:{type:String},
    sl:{type:String},
});

 
module.exports = mongoose.model ('IRO', iroSchema)
