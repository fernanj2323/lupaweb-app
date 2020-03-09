export interface jobBrief {


created:string; //fecha de creacion
approved:string; //fecha de aprobacion 
managementId:string; 
serviceLine:string;
responsibleOperational:string; //quien diligencia el formulario 
responsibleManager:string; //gerente de esa linea de servicio
location:string; 
well:string; 
cluster:string;
clientObjetivs:string;

//programa de trabajo es un modal de equipos y herramientas 
//guardamos los datos dentro de este mismo modelo para optimizar tiempos
 //equipos y herramientas:

workProgramObservation:string; 

//propios: 
quantityOwns :string; 
descriptionOwns:string;
observationsOwns:string; 

//proveedores
quantitySuppliers :string; 
descriptionSuppliers:string;
observationsSuppliers:string; 

//competencia y roles del personal
//es un modal de competencias y roles

competencesAndRolesObservation:string; 

//roles del personal 
personalUser:string; 
dayTurn:string; 
nightTurn:string; 
responsibilities:string; 
directOrComunity:string; 

//competencias
heights:string; 
rigPass:string; 
wellControl:string; 
rigger:string; //aparejador
craneOperator:string; //operador de grua
defensiveDriving:string; 
H2S:string; 

operationalsParameters:string; 
potentialsProblems:string;
learnedLessons:string; 



} 