    const mongoose = require('mongoose');
    const { Schema } = mongoose;

    const photoSchema = new Schema ({
        form: String, 
        item: String,
        autor: String, 
        idAutor: String, 
        imagePath: String,
        managementId:String,
        courseId:String,
        type: String,
        phase:String,
        observation:String 
    })


    module.exports = mongoose.model('Photo', photoSchema);