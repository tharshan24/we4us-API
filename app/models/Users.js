const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: Number,
    userName: String,
    location: {
        type: String,
        coordinates: [Number]
    },
    isDriver: Number,
    driverMode: Number,
    paymentType: Number,
    socketId: String
},{ typeKey: '$type' })

module.exports = mongoose.model('User', UserSchema);