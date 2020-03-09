const Profile = require ('../../models/users/profile');
const profileCtrl = {};

profileCtrl.getProfiles = async (req, res) =>{

   const profile =  await Profile.find();
    var profile2 = profile;
   res.json(profile2);
}
profileCtrl.getProfileById = async (req, res) => { 
    //console.log('logg', req.body);
    const id = req.body.id; 
    const profile = await Profile.findById(id);
   // console.log(profile )
    res.json(profile);

}
profileCtrl.getProfileByAuthId = async (req, res) => {
  //  console.log(req.body)
    const profile = await Profile.find({
        authId: req.body.authId
    });
  //  console.log(profile)
    res.json(profile);
}

profileCtrl.getProfileByEmail = async (req, res) =>{
    //console.log(req.body);
    const profile = await Profile.find({
        email: req.body.email
    });
    res.json(profile);
}

profileCtrl.editProfile = async (req, res) => {
   
    const id = req.params.id;
    // const array = req.body;
 console.log(req.body);
 console.log('req.body');
  
    const array = ({
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        sex: req.body.sex, 
        phone: req.body.phone, 
        identification: req.body.identification, 
        status: req.body.status, 
        email: req.body.email, 
        // authId: req.body.authId, 
        role: req.body.role, 
        country: req.body.country, 
        district: req.body.district, 
        company: req.body.company, 
        department: req.body.department, 
        serviceLine:{
            operations:{
                wt: req.body.wt, 
                sl: req.body.sl, 
                fi: req.body.fi, 
                ct: req.body.ct, 
                wl: req.body.wl, 
            }
        },
        job:req.body.job, 
        permisology:{
            eservices:{
                kom:{
                    observe: req.body.viewKomPermisology, 
                    edit: req.body.editKomPermisology, 
                    create: req.body.createKomPermisology,
                    aprobation: req.body.aprobationKomPermisology,
                },
                WorkPreparation:{
                    observe: req.body.viewKomPermisology, 
                    edit: req.body.editKomPermisology, 
                    create: req.body.createKomPermisology,
                    aprobation: req.body.aprobationWPermisology,
                },
                PrejobIndex:{
                    observe: req.body.viewKomPermisology, 
                    edit: req.body.editKomPermisology, 
                    create: req.body.createKomPermisology,
                    aprobation: req.body.aprobationPreJobPermisology,
                },
                IRO:{
                    observe: req.body.viewIROPermisology, 
                    edit: req.body.editIROPermisology, 
                    create: req.body.createIROPermisology,
                    aprobation: req.body.aprobationIROPermisology,
                },

                closing:{
                    observe: req.body.viewClosingPermisology, 
                    edit: req.body.editClosingPermisology, 
                    create: req.body.createClosingPermisology,
                    aprobation: req.body.aprobationClosingPermisology,
                },

                lections:{
                    observe: req.body.viewLectionsPermisology, 
                    edit: req.body.editLectionsgPermisology, 
                    create: req.body.createLectionsPermisology,
                    aprobation: req.body.aprobationLectionsPermisology,
                },
            },
            ejourney:{
                basic:{
                    observe: req.body.ejourneyView, 
                    edit: req.body.ejourneyEdit, 
                    create: req.body.ejourneyCreate,
                },
                approbation:{
                    chiefDistrict: req.body.ejourneyChiefDistrict, 
                    operationsManager: req.body.ejourneyOpManager, 
                    generalManager: req.body.ejourneyGeneralManager,
                    industrialProtectionSupervisor: req.body.ejourneyIndustrialProtectionSupervisor,
                    dispatcher: req.body.ejourneydispatcher,
                }
            }
        }
    });


   // console.log('*****************',array); 

     const profile = await Profile.findByIdAndUpdate(
         id, {$set:array}, {new:true}
     );

     res.json({
         status: 'updated',
         profile: profile
     });
}


module.exports = profileCtrl;