const express = require('express');
const router = express.Router(); 
var multer  = require('multer')


var upload = multer({ 
    dest: 'uploads/photos',
    limits: {
        fileZise: 7000000    //peso maximo 7mb 
        },
});
//eLearning
var uploadPdf = multer({ 
    dest: 'uploads/documents',
    limits: {
        fileZise: 7000000    //peso maximo 7mb 
        },
});


const photo = require ('../controllers/photo.controller');

router.get('/', photo.getPhotos); //traerse todas las fotos


//upload.single('') definimos el nombre que debe tener el archivo para ser manipulado,
//sin ese nombre no enrutamos



//eservices//
router.post('/eservices/managementWPhoto', upload.single('photo'), photo.postPhoto); //eservices actividad con foto
router.put('/eservices/findPhotos', photo.findPhoto);//buscar foto por formulario, item y usuario 
router.put('/Notempty', photo.findPhoto2);//buscar foto por formulario, item y usuario 
router.post('/postPhotoOrDocument', upload.single('photo'),  photo.postPhotoOrDocument); 
router.post('/getPhotoByClosingPhase',  photo.getPhotoByClosingPhase);


router.get('/:id', photo.getPhoto);
router.get('/getPhotoByCourseId/:id', photo.getPhotoByCourseId);
router.delete('/:id', photo.deletePhoto);

///validaciones de multer sobre peso de archivo 



//rutas de Elearning 

router.post('/addCourses', uploadPdf.single('photo'), photo.elearningSavePhoto);


module.exports = router;  