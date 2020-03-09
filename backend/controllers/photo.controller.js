const Photo = require('../models/photos');
const photoCtrl = {};
const path = require('path');
const fs = require ('fs');
// var fs = require(‘fs‘);



//traer fotos 
photoCtrl.getPhotos = async (req, res, next) => {

    const photo = await Photo.find();
    res.json(photo);
    // storage; 

};

//traer foto por formulario 
photoCtrl.findPhoto = async (req, res, next) => {
   //sin item

//    console.log('find photo req', req.body)
    const thisForm =  new Photo({
        managementId:req.body.managementId,
        idAutor:req.body.idAutor
    });
    //anteriormente se buscaba por autor y id de management, pero es suficiente solo con management ID 
    //const tPhoto = await Photo.find({managementId:thisForm.managementId, idAutor:thisForm.idAutor});
    const tPhoto = await Photo.find({managementId:thisForm.managementId, phase: req.body.phase});
    // console.log('photos que hacen match con el id: ',tPhoto)
    res.json(tPhoto);
};

photoCtrl.findPhoto2 = async (req, res, next) => {
      //con item 
    const thisForm =  new Photo({
        managementId:req.body.managementId,
        item:req.body.item,
        idAutor:req.body.idAutor
    });

    const tPhoto = await Photo.find({managementId:thisForm.managementId, item:thisForm.item, idAutor:thisForm.idAutor});
    res.json(tPhoto);
    
};
//---------------------------------------------------
//-------------------ESERVICES-----------------------
//---------------------------------------------------
photoCtrl.postPhoto = async (req, res, next) => { //save
console.log('****postPhoto*****')
console.log({
            reqbody: req.body,
            reqfile: req.file
        });
    //validaciones 
    //archivos filtrados mayores de 7 megas 
     if (req.file.size > 7000000)
     {
         console.log('Archivo pesa mas de 7mb');
         return res.status(500).send('Archivo pesa mas de 7mb');
     } 

     // formatos aceptados
     if (req.file.mimetype !== 'image/jgp' && req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg')
     {
        console.log('Formato de archivo no soportado');
        res.status(501).send('Formato de archivo no soportado');

    //si todo esta bien 
     } else {        
        const NewPhoto = new Photo ({
            form:req.body.form,
            item:req.body.item,
            autor:req.body.autor,
            idAutor:req.body.idAutor,
            phase: req.body.phase, 
            imagePath: req.file.path ,
            managementId: req.body.managementId
        });
        await NewPhoto.save();
        res.json({
            newpoto: NewPhoto
        });
     }
};

photoCtrl.getPhoto = async (req,res,next)=>
{
    var id = req.params.id; 
    const Photo = await Photo.findById(id);
    res.json({
        status: Photo
    });
};

photoCtrl.deletePhoto = async (req, res,next) =>
{    
    var id = req.params.id; 
    console.log(req.params.id);
    const Photos =  await Photo.findByIdAndRemove(id)
    const PhotoPath = Photos.imagePath;
    console.log(PhotoPath);
   
    fs.unlink(PhotoPath, function(err){
        if (err) throw  err;
        console.log('ELiminado de NODE Folder')
        res.json({
            status: Photos
        });
    });
};


//post foto o documento 
photoCtrl.postPhotoOrDocument = async (req, res, next) => {

    console.log({
        observation: req.body.observation,
        reqbody: req.body,
        reqfile: req.file
    });
 
     if (req.file.size > 10000000)
     {
         console.log('Archivo pesa mas de 7mb');
         return res.status(501).send('Archivo pesa mas de 10 mb');
     } 
 
     if (req.file.mimetype !== 'image/jgp' && req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'application/pdf')
     {
        console.log('Formato de archivo no soportado');
        res.json(501);
 
    //si todo esta bien 
     } else {  
         
        

        if ( req.file.mimetype == 'application/pdf'){
            req.file.filename = req.file.filename + '.pdf'; 
            // console.log('****************************')
            // console.log(req.file)
            
        }



        const NewPhoto = new Photo ({
            form:req.body.form,
            item:req.body.item,
            autor:req.body.autor,
            idAutor:req.body.idAutor,
            phase: req.body.phase, 
            imagePath: req.file.path ,
            type: req.file.mimetype,
            managementId: req.body.managementId,
            observation: req.body.observation
        });

        await NewPhoto.save();
        res.json(NewPhoto);
     }
 
 }

 //buscar foto por item, managementId y userId
photoCtrl.getPhotoByClosingPhase = async (req, res , next) => {
   // console.log(req.body)

   const Photos = await Photo.find({
    item:req.body.item,
    managementId: req.body.managementId,
//    idAutor: req.body.userId
   }); 

  // console.log(Photos);
   res.json(Photos);
}

// Module: eLearning
// Developer: Fernando Piñango
// Developer2: Mosiah Azuaje
// Date: 08-20-2019
// City: Bogota - Colombia
// Comments: Save photo and file
photoCtrl.elearningSavePhoto = async (req, res,next) =>
{        
    if(req.file.mimetype == 'application/pdf'){
        eLearningPath = req.file.path+".pdf";
    }else{
        eLearningPath = req.file.path;
    }
  //  console.log(req.body.type_data );
    const NewPhoto = new Photo ({
        courseId: req.body.courseId,
        autor:req.body.autor,
        idAutor:req.body.idAutor,
        imagePath: eLearningPath,
        type: req.body.type,
        type_data: req.body.type_data  
    });
    await NewPhoto.save(); 

    res.json({
        status: NewPhoto
    });
}

photoCtrl.getPhotoByCourseId = async (req,res,next)=>
{
    var id = req.params.id; 
    const photo = await Photo.find({
        courseId: id
    });
    res.json(photo);
}

module.exports = photoCtrl;