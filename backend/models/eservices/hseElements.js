const mongoose = require('mongoose');
const { Schema } = mongoose;

const hseElementsSchema = new Schema 
 ({
    workPreparationId:{type:String},
    userId:{type:String},

   QualityBoxN:{type:String},
   QualityBoxO:{type:String},

   GeneratorN:{type:String},
   GeneratorO:{type:String},

   ambientalKitN:{type:String},
   ambientalKitO:{type:String},

   auxKitN:{type:String},
   auxKitO:{type:String},

   ecoPointN:{type:String},
   ecoPointO:{type:String},

   ext30N:{type:String},
   ext30O:{type:String},

   ext150N:{type:String},
   ext150O:{type:String},

   securityPosterN:{type:String},
   securityPosterO:{type:String},

   supportMangaN:{type:String},
   supportMangaO:{type:String},

   eyeWashN:{type:String},
   eyeWashO:{type:String},

   geomembraneN:{type:String},
   geomembraneO:{type:String},

   skimmerN:{type:String},
   skimmerO:{type:String},

   bulkDrumN:{type:String},
   bulkDrumO:{type:String},

   iluminationN:{type:String},
   iluminationO:{type:String},

   vanN:{type:String},
   vanO:{type:String},

   portatilBN:{type:String},
   portatilBO:{type:String},

   comunicationKitN:{type:String},
   comunicationKitO:{type:String},


   atmosphereMeterN:{type:String},
   atmosphereMeterO:{type:String},

   extensionN:{type:String},
   extensionO:{type:String},

   workPreparationId:{type:String},
   userId:{type:String},

});

 
module.exports = mongoose.model ('hseElements', hseElementsSchema)
