export interface iro {
  
    _id?:string; 
    creatorId:string;
    status:number; 
    dateOfCreated:string; 
    observations: string; 
    jobNumber:string; 
    aprobatorName:string; 
    aprobatorId:string; 
    aprobatorRole:string;
    aprobation: boolean; //aprobation true or false 
    riskIndex:string; 
    managementId:string;


    aprobationLevel:number; 
    
    //  ¿Se ha completado una inspección del sitio del pozo en la locacion / taladro, o el cliente ha proporcionado detalles de la locacion equivalentes para garantizar la selección correcta de los equipos?
    locationInspectionO:string; 
    locationInspectionT:boolean; 
    locationInspectionR:string; 

    //  ¿El objetivo del trabajo ha sido claramente definido y acordado con el cliente y la información provista es suficiente y confiable para completar el diseño del trabajo?
    jobObjO:string; 
    jobObjT:boolean; 
    jobObjR:string; 

    //   ¿Se ha preparado un programa de trabajo que incluya la historia del pozo, la información del pozo, las presiones operativas, los resultados del software de diseño, el esquema detallado del pozo, el diagrama BHA y el procedimiento operacional del trabajo? 3
    workProgramO:string; 
    workProgramT:boolean; 
    workProgramR:string; 


    //   ¿El programa de trabajo ha sido revisado por un par (es) con un nivel adecuado de experiencia y aprobado por el nivel adecuado de gerencia de línea / Excelencia y el cliente?
    workProgram2O:string; 
    workProgram2T:boolean; 
    workProgram2R:string; 
    
    //  Si hay contratistas involucrados, ¿los límites y responsabilidades están bien definidos y acordados con el cliente?
    contractorsO:string; 
    contractorsT:boolean; 
    contractorsR:string; 

    //¿Hay pescados, escombros o daños mecánicos sospechosos en el pozo?
    fishO:string; 
    fishT:boolean;
    fishR:string; 


    // ¿Es esto una operación de cementación o estimulación a través del CT?
    cementationO:string; 
    cementationT:boolean; 
    cementationR:string; 


    // ¿El CT se va a usar en un ambiente corrosivo (ácido, H2S, CO2, rico en oxígeno), erosivo o abrasivo? 
    corrosiveO:string; 
    corrosiveT:boolean;
    corrosiveR:string; 

    //¿ Si es trabajo crítico se ha revisado con gerencia los requisitos de Preparación y Planeación?
    preparationO:string;
    preparationT:boolean;
    preparationR:string; 


   //  ¿ El Sup. Del trabajo , Operador de CT y operadores de bombas han realizado trabajos similares y/o tienen la competencia  la Gerencia de la Linea? 
    similarWorkO:string;
    similarWorkT:boolean;
    similarWorkR:string;


    //¿ La cuadrilla esta al corriente con todos los procedimientos aplicables de Lupatech y certificaciones HSEQ?
    proceduresO:string;
    proceduresT:boolean;
    proceduresR:string;


    //¿Hay un miembro de la cuadrilla competente en el armado (Rig Up), la operación y MAPRE-I de cada pieza de equipo y herramientas de fondo de pozo (BHA) que se utilizarán en este trabajo?
    rigUpO:string;
    rigUpT:boolean;
    rigUpR:string;

    //  ¿El tamaño de la cuadrilla es suficiente y cumple con los requerimientos contractuales y legales para operar cada equipo y cumplir con prácticas de la industria & procedimientos Lupatech?
    teamSizeO:string;
    teamSizeT:boolean;
    teamSizeR:string; 


    // Para operaciones de varios segmentos, incluidos contratistas (cemento, estimulación, registro electrico, canoneo, herramientas de fondo de Pozo, Well Testing, etc), ¿se ha identificado el Sup. de Trabajo general, se han definido las responsabilidades y las líneas de comunicación con el cliente?
    operationRespO:string;
    operationRespT:boolean;
    operationRespR:string;

    // ¿El equipo seleccionado está preparado y actualizado en MAPRE 1 y MAPRE 2? (incluye equipo auxiliar) 
    mapreActualizationO:string;
    mapreActualizationT:boolean;
    mapreActualizationR:string;


    //  ¿El equipo de control de Presion y accesorios de alta presion está al corriente en inspección, certificacion y pruebas de presion según requerimientos internos y de clientes ? 
    pressureEquipentO:string;
    pressureEquipentT:boolean;
    pressureEquipentR:string;


    // ¿Está  el sistema de registro, adquisicón de parámetros criticos operacionales instalado y funcional?
    loginSystemO:string;
    loginSystemT:boolean;
    loginSystemR:string;

     // ¿Se ha verificado la calibración de la celda de carga del cabezal del inyector utilizando el verificador de peso en los últimos 12 meses y se ha calibrado dentro de los ultimos 24 meses? 
     calibrationVerificationO:string;
     calibrationVerificationT:boolean;
     calibrationVerificationR:string;


    //  ¿La tuberia de CT ha: a) tuvo una falla previa, b) tiene daño conocido, c) se utilizó anteriormente más allá de 80% de vida util ?  
     tubingO:string;
     tubingT:boolean;
     tubingR:string;


     
    //  ¿Se han revisado los límites operativos, las clasificaciones y el tamaño (longitud, OD, ID) de las herramientas de fondo de pozo (incluidas las alquiladas a terceros)?
    operativeLimitsO:string;
    operativeLimitsT:boolean;
    operativeLimitsR:string;


    //    El supervisor del trabajo ha revisado y confirma que se cumplen con las reglas de Oro de Coiled Tubing?
    goldenRulesO:string;
    goldenRulesT:boolean;
    goldenRulesR:string;


    // ¿Los requerimientos claves del trabajo han sido revisados por el el supervisor de cada turno/Jefe de línea y el programa de Trabajo ha sido aprobado por el cliente?
    critReqO:string;
    critReqT:boolean;
    critReqR:string;


    
    //  ¿El Sup. Del Trabajo entiende su responsabilidad de detener el trabajo por riesgos de calidad presentes y la necesidad de realizar Manejo de Cambio cuando cambian las condiciones en el pozo?
    supRespO:string;
    supRespT:boolean;
    supRespR:string;


    // ¿Se han cargado piezas de repuesto y consumibles para minimizar el NPT en la locacion a < 4 horas?
    nptMinO:string;
    nptMinT:boolean;
    nptMinR:string;


    ///    Cuando la locacion del pozo está alejado de la costa o en area remota, ¿se puede reemplazar el equipo, incluida el carreto de tubería flexible, (teniendo en cuenta las limitaciones logísticas) con un NPT resultante < 48 horas? 
    wellLocationO:string;
    wellLocationT:boolean;
    wellLocationR:string;
    
    sl:string; 




}