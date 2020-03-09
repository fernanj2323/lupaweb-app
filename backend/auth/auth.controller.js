const User = require('./auth.dao');
const Profile = require('./auth.profiles');
 //para encriptar el password
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';
const UserModel = require('./auth.model');
const user = {};
const profile = require('../models/users/profile');

exports.createUser = (req, res, next) => {
  // console.log(req.body); 
  const newUser = {
    firstName: req.body.firstName,
    lastName:req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    role: req.body.role,
    department: req.body.department,
    status: true
  }

  User.create(newUser,async (err, user) => {
    if (err && err.code === 11000) return res.status(409).send('Email already exists');
    if (err) return res.status(500).send({ message: newUser} );
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id },
      SECRET_KEY, {
        expiresIn: expiresIn
      });
    const dataUser = {
      id: user._id, 
      firstName: user.firstName,
      lastName: user.lastName, 
      email: user.email,
      accessToken: accessToken,
      expiresIn: expiresIn,
      role: user.role,  
     // create: user.create,
      department: user.department
    }
 console.log('*****************************',user)



    //creacion de profile a partir de datos recolectados de auth
    //ESERVICES DEPENDENCIES// 
    //si es de operaciones 
    if (req.body.department == 'Operaciones'){ 
      //si tiene permisos administrativos 
      if (req.body.role == 'Administrador' || req.body.role == 'Gerencia' || req.body.role == 'Lider')
      {

        console.log('administrador de operaciones------------------>')

        // console.log(req.body.WT)
        if (!req.body.WT == true){
          req.body.WT = false
        }
        if (!req.body.SL == true){
          req.body.SL = false
        }
        if (!req.body.FI == true){
          req.body.FI = false
        }
        if (!req.body.CT == true){
          req.body.CT = false
        }
        if (!req.body.WL == true){
          req.body.WL = false
        }
        console.log(req.body)
        const Profile = new profile ({
          status:true, 
          authId: user._id, 
          firstName: req.body.firstName,
          lastName: req.body.lastName, 
          email: req.body.email,
          role: req.body.role,
          department: req.body.department,

          serviceLine:{
            operations:{
              wt: req.body.WT, 
              sl: req.body.SL, 
              wl: req.body.WL,
              ct: req.body.CT, 
              fi: req.body.FI, 
            }
          },

          permisology:{
            eservices:{
              //operaciones con permisos puede ver KOM, y todos los permisos en  
              //work preparation 
              // y prejob index 
              kom:{
                observe: true, 
                edit: false, 
                create: false, 
              },
              WorkPreparation:{
                observe: true, 
                edit: true, 
                create: true, 
              },   
              PrejobIndex:{
                observe: true, 
                edit: true, 
                create: true, 
              },
            },
            ejourney:{
              basic:{
                observe: false,
                edit: false,
                create: false,
              },
              approbation:{
                chiefDistrict: false,
                operationsManager: false,
                generalManager: false,
                industrialProtectionSupervisor: false,
                dispatcher: false,
              },
            }
          } 
        })

        await Profile.save();
        res.send({ Profile });

      } else { //si es un usuario basico de operaciones 
        const Profile = new profile ({
          status:true, 
          authId: user._id, 
          firstName: req.body.firstName,
          lastName: req.body.lastName, 
          email: req.body.email,
          role: req.body.role,
          department: req.body.department,
       
          serviceLine:{
            operations:{
              wt: req.body.WT, 
              sl: req.body.SL, 
              wl: req.body.WL,
              ct: req.body.CT, 
              fi: req.body.FI, 
            }
          },

          permisology:{
            eservices:{
              //operaciones con permisos basico puede ver KOM, y algunos permisos en  
              //work preparation 
              // y prejob index 
              kom:{
                observe: true, 
                edit: false, 
                create: false, 
              },
              WorkPreparation:{
                observe: true, 
                edit: true, 
                create: false, 
              },   
              PrejobIndex:{
                observe: true, 
                edit: true, 
                create: false, 
              },
            },
            ejourney:{
              basic:{
                observe: false,
                edit: false,
                create: false,
              },
              approbation:{
                chiefDistrict: false,
                operationsManager: false,
                generalManager: false,
                industrialProtectionSupervisor: false,
                dispatcher: false,
              },
            }
          } 
        })

            // response 

        await Profile.save();
        res.send({ Profile });
      }


    }
    //si es departamento de comercial
       if (req.body.department == 'Comercial'){ 
        const Profile = new profile ({
          status:true, 
          authId: user._id, 
          firstName: req.body.firstName,
          lastName: req.body.lastName, 
          email: req.body.email,
          role: req.body.role,
          department: req.body.department,
          permisology:{
            eservices:{
              //operaciones con permisos basico puede ver KOM, y algunos permisos en  
              //work preparation 
              // y prejob index 
              kom:{
                observe: true, 
                edit: true, 
                create: true, 
              },
              WorkPreparation:{
                observe: true, 
                edit: false, 
                create: false, 
              },   
              PrejobIndex:{
                observe: true, 
                edit: false, 
                create: false, 
              },
            },
            ejourney:{
              basic:{
                observe: false,
                edit: false,
                create: false,
              },
              approbation:{
                chiefDistrict: false,
                operationsManager: false,
                generalManager: false,
                industrialProtectionSupervisor: false,
                dispatcher: false,
              },
            }
          }
        });

                // response 

        await Profile.save();
        res.send({ Profile });

       } //si es cualquier otro departamento que no tiene que ver con eservices
       else{
        const Profile = new profile ({
          status:true, 
          authId: user._id, 
          firstName: req.body.firstName,
          lastName: req.body.lastName, 
          email: req.body.email,
          role: req.body.role,
          department: req.body.department,
          permisology:{
            eservices:{
              //operaciones con permisos basico puede ver KOM, y algunos permisos en  
              //work preparation 
              // y prejob index 
              kom:{
                observe: false, 
                edit: false, 
                create: false, 
              },
              WorkPreparation:{
                observe: false, 
                edit: false, 
                create: false, 
              },   
              PrejobIndex:{
                observe: false, 
                edit: false, 
                create: false, 
              },
            },
            ejourney:{
              basic:{
                observe: false,
                edit: false,
                create: false,
              },
              approbation:{
                chiefDistrict: false,
                operationsManager: false,
                generalManager: false,
                industrialProtectionSupervisor: false,
                dispatcher: false,
              },
            }
          }
        })
            // response 

        await Profile.save();
        res.send({ Profile });
       }
    

  });
};
exports.getUsers = async (req, res, next) => {
  const  role =  req.body; 
    const employees = await User.find({});
    res.send(employees);
};
exports.getUsersForRole = async (req, res, next) => {
  //const  role =  req.body; 
  //res.send(role); 
  const employees = await User.find(
    {role: req.body.role}
  );
  res.send(employees);
};
exports.findByIdByParams  = async (req, res, next) => {

  const id  = req.params.id;
  const user = await User.findOne({_id: id});
  const dataUser = {
    id: user._id, 
     firstName: user.firstName,
     lastName: user.lastName, 
    email: user.email,
    // accessToken: accessToken,
    // expiresIn: expiresIn,
     role: user.role,
  //   //create: user.create,
    department: user.department,
  //   v: user.__v
   }
   res.send(dataUser);

}
exports.findById = async (req, res, next) => {

  // res.json({
  //   body: req.body,
  //   status: req.status
  // });

   const userData = {
    id: req.body.id,
  // // email: "1@gmail.com"
   }
  const id  = req.body.id;
   const user = await User.findOne({_id: userData.id});
  // //asi filtramos que queremos enviar y que no 
   const dataUser = {
    id: user._id, 
    firstName: user.firstName,
    lastName: user.lastName, 
    email: user.email,
    // accessToken: accessToken,
    // expiresIn: expiresIn,
     role: user.role,
  //   //create: user.create,
    department: user.department,
  //   v: user.__v
   }
 res.send(dataUser);
};


exports.loginUser = (req, res, next) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  }
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) return res.status(500).send('Server error!');
    var dataUser = {};
    if (!user) {
      // email does not exist
      res.status(400).send({ message: 'Something is wrong user' });
    } else {
      const resultPassword = bcrypt.compareSync(userData.password, user.password);
      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
          // bring user data from profile
          Profile.findOne({ email: userData.email }, (err, resProfile) => {
            if (!err) {
              dataUser = {
                id: user.id, 
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accessToken: accessToken,
                expiresIn: expiresIn,
                role: user.role,
                permisology: resProfile,
                department: user.department
              }
            } else {
              dataUser = {
                id: user.id, 
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accessToken: accessToken,
                expiresIn: expiresIn,
                role: user.role,
                permisology: [],
                // create: user.create,
                department: user.department
              }
            }
            res.send({dataUser});
          });
      } else {
        // password wrong
        res.status(409).send({ message: 'Something is wrong' });
      }
    }
  });

}


exports.editUser  = async (req, res, next) => {
  //res.send(req.body);
  const id = req.body.id;
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email, 
    role: req.body.role, 
    department: req.body.department
  };
  await User.findByIdAndUpdate(id, {$set: user}, {new: true});
  res.send('Updated');
}
exports.deleteUser  = async (req, res, next) => {
 
 // res.send(req.params.id);
  await User.findByIdAndRemove(req.params.id)
  if (err)  {
    res.send(err);
    this.getUsers();
  }
  this.getUsers();
  res.send('Deleted');
}





