// import multer from 'multer';
const multer = require ('multer');
//modulo que nos permite crear ID aleatorios
//import uuid from 'uuid/v4';
const uuid = require('uuid/v4');
//importamos path con lo que vamos a guardar en el nombre el .JPG o .JPG o .PDF del archivo en el nombre del archivo 
//import path from 'path';
const path = require ('path');


const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});




// console.log('storage2222222222222222222222222222222');




//export default  multer({storage}); 

//export default multer({storage});
 module.exports = storage;