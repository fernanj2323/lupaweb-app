'use strict'
const path = require('path');
//DEPENDENCIES////
const authRoutes = require('./auth/auth.routes');
const express = require('express');
const app = express();
const router = express.Router(); 
//requerimos el modulo de Emails 
const nodemailer = require('nodemailer');
// const Email = require('./emails/email');
//var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var nodeMailgun = require('nodemailer-mailgun-transport');
//dependencies for front and backend  port  matching 
const cors = require('cors');
//dependencies for upload data 
// const bodyParser = require ('body-parser');
const bodyParserURLEncoded = bodyParser.urlencoded({extended: true});
const bodyParserJSON = bodyParser.json();
const multipart = require ('connect-multiparty');
//dependencies for DB 
const { mongoose } = require('./configDB/database');
const properties = require('./configDB/properties');

const morgan = require('morgan');


///multer
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


////START SERVER ////
main();


///FUNCTIONS//// 
function main ()
{
    
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// } 
    app.set(properties.PORT, process.env.PORT || 3000);
    app.listen(properties.PORT, () => {
        console.log(`server on port ${properties.PORT}`);
    });
    //this folder will be used for the public uploads
    //path resolve nos permite que no tengamos que escribir la ruta completa como cd/desktop/kraken/lupaweb/backend........ 
    // path va a ir directamente a la carpeta uploads y eso es lo que va a publicar en el navegador 
    app.use('/uploads', express.static(path.resolve('uploads')));
    middlewares();

}

function middlewares(){
    // Middlewares
    // app.use(morgan('dev'));
    app.use(cors({origin: 'http://localhost:4200'}));
    app.use(express.json());//de esta forma podemos entender los archivos JSON que vengan de Frontend y manipularlos 
    app.use(bodyParserJSON);
    app.use(bodyParserURLEncoded);
    routes();
}

function routes(){
    
    //-------------------------
    //APIS
    //-------------------------
    //Datos Maestros
    app.use('/api/departments',require('./routes/deparment.routers'));
    app.use('/api/rolConfig',require('./routes/rolConfig.router'));
    app.use('/api/courseCategs',require('./routes/courseCateg.router'));
    app.use('/api/teachers',require('./routes/teachers.router'));
    app.use('/api/levels', require('./routes/eLearningLevel.routes'));
    app.use('/api/courseModules', require('./routes/eLearningModule.routes'));
    app.use('/api/user', require('./routes/users/user.routes'));
    app.use('/api/courseSubModules', require('./routes/eLearningSubModule.routes'));
    app.use('/api/questionsAndanswer', require('./routes/eLearning/questionsAnwers.routes'));
    app.use('/api/questionsAws', require('./routes/eLearning/questionsAws.routes'));
    app.use('/api/testing', require('./routes/eLearning/testing.routes'));

    app.use('/api/results', require('./routes/eLearning/result.router'));
    //--Datos Maestros--

    //emails routes
    app.use('/api/email', require('./routes/email.routes'));
    //app.use('/api/notifications', require('./routes/notifications.routes'));
    // Employee routes
    app.use('/api/employees', require('./routes/employee.routes'));
    //to singing 
    app.use('/api', router);
    authRoutes(router);
    //to Tickets 
    app.use('/api/tickets', require('./routes/tickets.routes'));
    //to E-Services
    app.use('/api/eservices/card', require('./routes/eservices/homeCard.routes'));
    app.use('/api/eservices/lections', require('./routes/eservices/lections.routes'));
    app.use('/api/eservices',require('./routes/eServicesManagement.routes'));
    app.use('/api/workPreQuestions', require('./routes/eservices/workPreparation.routes'));
    app.use('/api/workPreparation', require('./routes/eservices/workPreparation.routes'));
    app.use('/api/iro', require('./routes/eservices/iro.routes'));
    app.use('/api/jobBrief', require('./routes/eservices/jobBrief.routes'));
    app.use('/api/closingPhases', require('./routes/eservices/closingPhase.routes'));
   //     management con datos criticos, 
   //     app.use('/api/eservices/critical',require('./routes/eServicesManagement.routes'));

    // photos routes
    app.use('/api/photos', require ('./routes/photos.routes'));
    //documents routes 
     app.use('/api/documents', require('./routes/documents.routes'));
     // E-learning courses
     app.use('/api/course',require('./routes/courses.routes'));
     //  Clientes
     app.use('/api/Client',require('./routes/client.routes'));
     ///notifications 
     app.use('/api/not',require('./routes/notifications.routes'));
     //locations 
     app.use('/api/locations', require('./routes/locations.routes'));
    //req criticos 
     app.use('/api/criticalsreq', require ('./routes/criticalReq.routes'));
    // Ejourney
    app.use('/api/journey',require('./routes/ejourney/journey.routes'));
    app.use('/api/vehicle',require('./routes/ejourney/vehicle.routes'));
    app.use('/api/driver',require('./routes/ejourney/driver.routes'));
    app.use('/api/passenger',require('./routes/ejourney/passenger.routes'));
    //--------------------------
   
    //OTRAS RUTAS 
    //--------------------------
    //con esta ruta le decimos al navegador donde puede tomar las imagenes o documentos 
    app.use('/uploads', express.static(path.resolve('uploads')));

}


process.env.TZ = 'UTC-5';