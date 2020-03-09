const Location = require ('../models/location');
const Country  = require ("../models/locations/country");
const District = require ('../models/locations/district');
const Camp = require ('../models/locations/camp');
const Closter = require ('../models/locations/closter');
const Well = require ('../models/locations/well');
const locationtCtrl = {};


//Country
locationtCtrl.getCountrys = async (req, res ) => {
    const countrys = await Country.find()
    res.json (countrys);
}

locationtCtrl.createCountry = async (req,res) => {


    const country = new Country ({
        name:req.body.name,
        newCountry:req.body.newCountry, 
    }); 
    await country.save();
    res.json({
        status: 'Country Created'
    });

}
locationtCtrl.editCountry = async (req, res) =>{ 
    // res.json({
    //     status: 'country updated'
    // });
    const id = req.params.id;
    const country = req.body;
    await Country.findByIdAndUpdate(id, {$set:country}, {new:true});
    res.json({
        status: 'country updated'
    });
}


//District
locationtCtrl.getDistricts = async (req, res ) => {
    const district = await District.find()
    res.json (district);
}

locationtCtrl.getDistrictsByCountry  = async (req, res) => {
    console.log(req.body, '-----------------/.')
    const country = req.body.country; 
    const district = await District.find({
        country:country 
    })
    res.json(district);
}
locationtCtrl.createDistrict = async (req,res) => {
    const district = new District ({
        name:req.body.name,
        country:req.body.country,
        newDistrict:req.body.newDistrict, 
    }); 
    await district.save();
    res.json({
        status: 'District Created'
    });
}

locationtCtrl.editDistrict = async (req, res) =>{ 
    console.log('body',req.body.name);
    console.log('paramas',req.params.id);

    const id = req.params.id;
    const district = req.body;



    await District.findByIdAndUpdate(id, {$set:district}, {new:true});
    res.json({
        status: 'district updated'
    });
}

//Camp 
locationtCtrl.getCamps = async (req, res ) => {
    const camp = await Camp.find()
    res.json (camp);
}

locationtCtrl.createCamp = async (req,res) => {
    console.log(req.body)
    const camp = new Camp ({
        name:req.body.name,
        newCamp:req.body.newCamp, 
        country:req.body.country,
        district:req.body.district,
    }); 
    await camp.save();
    res.json({
        status: 'Camp Created'
    });
}

locationtCtrl.editCamp = async (req, res) =>{ 
    const id = req.params.id;
    const camp = req.body;
    await Camp.findByIdAndUpdate(id, {$set:camp}, {new:true});
    res.json({
        status: 'camp updated'
    });
}


//Closter
locationtCtrl.getClosters = async (req, res ) => {
    const closter = await Closter.find()
    res.json (closter);
}

locationtCtrl.createCloster = async (req,res) => {
    const closter = new Closter ({
        country:req.body.country,
        district:req.body.district,
        camp: req.body.camp,
        name:req.body.name,
        newCloster:req.body.newCloster, 
    }); 
    await closter.save();
    res.json({
        status: 'Closter Created'
    });
}

locationtCtrl.editCloster = async (req, res) =>{ 

    console.log(req.body)
    const id = req.params.id;
    const closter = req.body;
    await Closter.findByIdAndUpdate(id, {$set:closter}, {new:true});
    res.json({
        status: 'closter updated'
    });
}


//Wells
locationtCtrl.getWells = async (req, res ) => {
    const Wells = await Well.find()
    res.json (Wells);
}

locationtCtrl.createWell = async (req,res) => {
    const well = new Well ({
        name:req.body.name,
        country:req.body.country,
        district:req.body.district,
        camp: req.body.camp,
        closter: req.body.closter, 
        newWell:req.body.newWell, 
    }); 
    await well.save();
    res.json({
        status: 'Well Created'
    });
}

locationtCtrl.editWell = async (req, res) =>{ 
    const id = req.params.id;
    const well = req.body;
    await Well.findByIdAndUpdate(id, {$set:well}, {new:true});
    res.json({
        status: 'well updated'
    });
}
//------------------
// locaciones 
//------------------

locationtCtrl.getLocations = async (req, res ) => {

    const locations = await Location.find()
    res.json(locations);
}


locationtCtrl.createLocation = async (req,res) => {
    const location = new Location ({
        name:req.body.name,
        newLocation:req.body.newLocation, 
    }); 
    await location.save();

    res.json({
        status: 'Locacion Creada'
    });

}

locationtCtrl.getLocation = async (req,res) => {
    const location = await Location.findById(req.params.id); 
    res.json(location);
}

locationtCtrl.editLocation = async (req, res) => {
    const id = req.params.id;
    const location = req.body;
    await Location.findByIdAndUpdate(id, {$set:location}, {new:true});
    res.json({
        status: 'Locacion Actualizada'
    });
}

locationtCtrl.deleteLocation = async (req, res) => {
    await Location.findByIdAndRemove(req.params.id);
    res.json({status: 'Locacion Eliminada'});
}


module.exports  = locationtCtrl; 