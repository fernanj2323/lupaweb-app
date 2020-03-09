const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema ({
    firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
      sex:{
        type:String,
      },
      phone:{
        type:Number,
      },
      identification:{
        type:Number,
      }, 
      status:{
        type:Boolean,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        unique: true
      },
      authId:{
          type:String, 
      },
      role: {
        type: String, 
        required: true, 
        trim: true, 
      },

      // locaciones
      country: {
        type: String,
      },
      district: {
        type: String,
      },
      
      company: {
        type: String,
      },


        //deparatemnto
        department: {
          type: String,
        },
          //si el departamento es de operaciones 
      serviceLine:{
        operations:{
          wt:{type: Boolean}, 
          sl:{type: Boolean}, 
          fi:{type: Boolean}, 
          ct:{type: Boolean}, 
          wl:{type: Boolean}, 
        }    
      },

      //cargo
      job:{
        type:String, 
      },

      //permisologia
      permisology:{

          //permisologias de eservices
        eservices:{

          //comercial
          kom:{
            admin:{type:Boolean},
            observe:{type: Boolean},
            edit:{type: Boolean},
            create: {type: Boolean},
            aprobation: {type: Boolean}
          },

          //responsables de operaciones
          WorkPreparation:{
            admin:{type:Boolean},
            observe:{type: Boolean},
            edit:{type: Boolean},
            create: {type: Boolean},
            aprobation: {type: Boolean}
          },

          //jefe de linea 
          PrejobIndex:{
            admin:{type:Boolean},
            observe:{type: Boolean},
            edit:{type: Boolean},
            create: {type: Boolean},
            aprobation: {type: Boolean}
          },

          //jefe de linea 
          IRO:{
            admin:{type:Boolean},
            observe:{type: Boolean},
            edit:{type: Boolean},
            create: {type: Boolean},
            aprobation: {type: Boolean}
          },

          //jefe de linea y mafer 
          closing: {
          admin:{type:Boolean},
          observe:{type: Boolean},
          edit:{type: Boolean},
          create: {type: Boolean},
          aprobation: {type: Boolean}
          },
          //jefe de linea y mafer 
           lections: {
            admin:{type:Boolean},
            observe:{type: Boolean},
            edit:{type: Boolean},
            create: {type: Boolean},
            aprobation: {type: Boolean}
            },
          
        },
      //permisologias de Elearning 
      //nota: si van a cambiar esta estructura, deben tambien cambiar la estructura de profile.controller.js componente editProfile en backend.  
        elearning:{
          createCourse:{
            observe:{type: Boolean},
            edit:{type: Boolean},
            create: {type: Boolean},
          },
        },
      //permisologias de Ehseq 
        //nota: si van a cambiar esta estructura, deben tambien cambiar la estructura de profile.controller.js componente editProfile en backend.  
        ehseq:{
          lupaCard:{
            observe:{type: Boolean},
            edit:{type: Boolean},
            create: {type: Boolean},
          },
        },
      //permisologias de ejourney 
        //nota: si van a cambiar esta estructura, deben tambien cambiar la estructura de profile.controller.js componente editProfile en backend.  
        ejourney:{
          basic:{
            observe:{type: Boolean},
            edit:{type: Boolean},
            create: {type: Boolean},
          },
          approbation:{
            chiefDistrict:{type: Boolean},
            operationsManager:{type: Boolean},
            generalManager: {type: Boolean},
            industrialProtectionSupervisor: {type: Boolean},
            dispatcher: {type: Boolean},
          },
        }
        

      },
      


      status: {
       type: Boolean 
      }

});

module.exports = mongoose.model('profile', profileSchema);

