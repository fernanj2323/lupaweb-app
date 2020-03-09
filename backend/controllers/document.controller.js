const Document = require('../models/documents');
const documentCtrl = {};
const path = require('path');
const fs = require ('fs-extra');

//traer documentos  
documentCtrl.getDocuments = async (req, res , next) => {
    const document = await Document.find();
    res.json(document); 
}; 

documentCtrl.postDocument= async (req, res, next) => {
    //req.body nos proporciona informacion enviada desde el font 
    //req.file proporciona informacion del documento como tal, nombre, formato, ubicacion 
    const newDocument = new Document ({
        title:req.body.title,
        description:req.body.description,
        autor:req.body.autor,
        idAutor:req.body.idAutor,
        //name: req.file.filename, 
        documentPath: req.file.path 
    });
    
     await newDocument.save();
    res.json({
        status: newDocument
    });
};

documentCtrl.getDocument = async (req,res,next)=>
{
    //con req.params traemos el ID que viene en el URL
    var id = req.params.id; 
    const document = await Document.findById(id);
     console.log(document);
    res.json({
        status: document
    });
}

documentCtrl.deleteDocument = async (req,res,next)=>
{

    const document = await Document.findByIdAndRemove(req.params.id);
    // if (document){
        await fs.unlink(path.resolve(document.documentPath));
    // }

    res.json({
        status: 'Document deleted'
    });



}

module.exports = documentCtrl;