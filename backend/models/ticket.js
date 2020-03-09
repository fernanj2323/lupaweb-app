const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema 
({
    title: { type: String},
    description: { type: String},  
    applicant: { type: String},    // quien solicita 
    applicantId: { type: String}, //ID quien solicita 
    responsable: { type: String}, //quien responde 
    status: { type: Number },     //0 = pendiente , 1 = en proceso , 2 = resuelto 
    response: { type: String },   //respuesta 
    created: { type: Date  }
}, 
{timestamps: true}
);

module.exports = mongoose.model('Ticket', ticketSchema);
