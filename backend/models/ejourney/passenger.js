const mongoose = require('mongoose');
const { Schema } = mongoose;


const passengerSchema = new Schema(
    {
        user: { type: Schema.ObjectId, ref: 'Users'},
        status: Number,
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Passenger', passengerSchema);