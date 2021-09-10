const mongoose = require('mongoose');

const DriverSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    driverId: Number,
    driverName: String,
    location: {
        type: String,
        coordinates: [Number]
    },
    socketId: String
},{ typeKey: '$type' })

module.exports = mongoose.model('Driver', DriverSchema);