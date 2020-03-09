const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobBriefSchema = new Schema 
 ({
approved:{type:Boolean},// aprobado: 1 es aprobado, 0 o null, es no aprobado; 
created:{type:String}, //fecha de creacion
approverd:{type:String}, //fecha de aprobacion 
managementId:{type:String}, 
serviceLine:{type:String},
responsibleOperational:{type:String},//quien diligencia el formulario 
responsibleManager:{type:String}, //gerente de esa linea de servicio
location:{type:String},
well:{type:String},
cluster:{type:String},
clientObjetivs:{type:String},

//programa de trabajo es un modal de equipos y herramientas 
//guardamos los datos dentro de este mismo modelo para optimizar tiempos
 //equipos y herramientas:

workProgramObservation:{type:String},

//propios: 
quantityOwns :{type:String},
descriptionOwns:{type:String},
observationsOwns:{type:String},

//proveedores
quantitySuppliers :{type:String},
descriptionSuppliers:{type:String},
observationsSuppliers:{type:String},

//competencia y roles del personal
//es un modal de competencias y roles

competencesAndRolesObservation:{type:String},

//roles del personal 
personalUser:{type:String},
dayTurn:{type:String}, 
nightTurn:{type:String},
responsibilities:{type:String},
directOrComunity:{type:String},

//competencias
heights:{type:String},
rigPass:{type:String},
wellControl:{type:String},
rigger:{type:String}, //aparejador
craneOperator:{type:String}, //operador de grua
defensiveDriving:{type:String},
H2S:{type:String},

operationalsParameters:{type:String},
potentialsProblems:{type:String},
learnedLessons:{type:String},

    

});

module.exports = mongoose.model ('jobBrief', jobBriefSchema)