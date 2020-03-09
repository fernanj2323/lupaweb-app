const mongoose = require('mongoose');
const { Schema } = mongoose;

//fase 1 por equipo comercial 
//gestion de inicio 
const eServicesManagementSchema = new Schema({

//README: 
//  Este es el modelo en el cual esta hecha la constitucion del proyecto, es la primera fase donde se le da inicio a un proyecto por el equipo comercial; para mas informacion ver el diagrama de flujo del sistema E-services
//como la planilla es bastante larga, ningun campo es required:true
//de esta forma la parsona puede guardar los adelantos que vaya cargando y luego terminarlas, 
//***********/
///
//
//este estilo de programacion se llama space-shuttle-style-programming
//ing Fernando Pinango 14/08/2019
     

 
id:{type:String},  
name: {type: String },
serviceDetail: {type: String},
client: {type: String },
dateInit: {type: String },
//cambiamos responsible line
//por un booleano de cada linea, ya que puede existir el caso de varias lineas en una sola orden de servicio
//responsibleLine: {type    wt:{type: Boolean},

wl:{type: Boolean},
sl:{type: Boolean},
ct:{type: Boolean},
fi:{type: Boolean}, //frente de inyeccion : String },
wt :{type: Boolean},


dateEnd: {type: String}, 


//locaciones
country: {type: String}, 
district: {type: String}, 
camp: {type: String}, 
closter: {type: String},


well: {type: String}, 
well2: {type: String}, 
well3: {type: String}, 
well4: {type: String}, 
well5: {type: String}, 

//nuevos criticos 
NewClient: {type: Boolean},
NewDistrict: {type: Boolean},
NewCamp: {type: Boolean},
NewWell: {type: Boolean},


scopeODT: {type: String}, 
stimatedRevenue:{type:String},
RequestInformation:{type:String},
planningFormat:{type:String},
history:{type:String},
technicalRequirements:{type:String},
adminisitrativeRequirements:{type:String},
RRHHRequirements:{type:String},
HSEQRequirements:{type:String},
otherRequirements:{type:String},


risk1 : {type: String},
cause1: {type: String},   
probability1 : {type: String},
impact1 : {type: String},
riskLevel1: {type: String},
actions1: {type: String},

risk2 : {type: String},
cause2: {type: String},   
probability2 : {type: String},
impact2 : {type: String},
riskLevel2: {type: String},
actions2: {type: String},

risk3 : {type: String},
cause3: {type: String},   
probability3 : {type: String},
impact3 : {type: String},
riskLevel3: {type: String},
actions3: {type: String},


risk4 : {type: String},
cause4: {type: String},   
probability4 : {type: String},
impact4 : {type: String},
riskLevel4: {type: String},
actions4: {type: String},

risk5 : {type: String},
cause5: {type: String},   
probability5 : {type: String},
impact5 : {type: String},
riskLevel5: {type: String},
actions5: {type: String},



milestone1:{type:String},
scheduledDate1:{type:String},
milestone2:{type:String},
scheduledDate2:{type:String},
milestone3:{type:String},
scheduledDate3:{type:String},
milestone4:{type:String},
scheduledDate4:{type:String},
milestone5:{type:String},
scheduledDate5:{type:String},
exclusions: {type: String}, 
leaderDesignation: {type: String}, 
phase: {type: String || Number || Boolean },
status : {type: String || Number || Boolean }, //1 en espera , 2 en proceso , 3 Realizado 
hrisk:{type: String}, 
finished:{type:Boolean},
})

module.exports = mongoose.model('eServicesManagement', eServicesManagementSchema);