const mongoose = require('mongoose');
const { Schema } = mongoose;


const vehicleSchema = new Schema(
    {
        brand: String, 
        model: String,
        type: String, 
        status: Number,
        plate: String, 
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);