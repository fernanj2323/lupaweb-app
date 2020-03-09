const express = require('express');
const router = express.Router();
// const router = Router(); 
const document = require('../controllers/document.controller');
//const multer = require  ('../libs/multer');
//import multer from '../libs/multer';
//const multer = require('../libs/multer');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/documents' })




//router.get('/', document.getDocuments);    

//upload.single('') definimos el nombre que debe tener el archivo para ser manipulado,
//sin ese nombre no enrutamos
router.post('/', upload.single('document'),document.postDocument);
router.get('/',document.getDocuments);
router.get('/:id', document.getDocument);
router.delete('/:id', document.deleteDocument);

module.exports = router; 