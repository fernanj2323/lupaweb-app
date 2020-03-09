const mongoose = require('mongoose');
const { Schema } = mongoose;


const notificationSchema = new Schema({
    creator: { type: String}, //nombre del creador 
    creatorId: { type: String},//id del creador
    responsable: { type: String},//nombre del responsable
    responsableId: { type: String},//id del responsable
    managementId: {type:String}, // id de actividad de eservices 
    title: {type:String}, //titulo 
    longTitle:{type:String},//titulo completo para mostrar mas detalles en el email
    description: { type: String },//descripcion
    form: {type: String}, //pregunta seleccionada 
    read: {type: Number}, //valor numero para definir si esta leido o no la notificacion 
    action: {type:String}, //almacena la ruta de la accion a ejecutar cuando hacemos click en la notificacion 
    created: {type: Date},
    modified:{type: Date},
    color:{type:String},
    status:{type:String} //status de accion 
});

module.exports = mongoose.model('Notification', notificationSchema);