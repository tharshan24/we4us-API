const mongoose = require('mongoose');

const DriverSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    driverId: Number,
    driverName: String,
    location: {
        type: String,
        coordinates: [Number]
    },
    socketId: String
})

module.exports = mongoose.model('Driver', DriverSchema);