const mongoose = require('mongoose');
const { Schema } = mongoose;

//esquema de mongo db 
const documentschema = new Schema({
    title: String, 
    autor: String, 
    desciption:String,
    idAutor: String, 
    item: String, 
    documentPath: String, //carpeta donde esta alamacenado 
}); 

//intrface de typescript 
//
// interface IDocument extends Document {
//     title: string; 
//     description: string; 
//     idAutor: string; 
//     item: string; 
//     documentPath: string; 
// }

//mongo db va a crear una coleccion llamada documentS en plural. 
//con las caracteristicas indicadas en este modelo 


// export default model<IDocument>('Document', schema); 


module.exports = mongoose.model('Document', documentschema);