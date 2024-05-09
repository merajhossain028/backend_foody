const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    addressLine1: {type: String, required: true},
    postalCode: {type: String, required: false},
    default: {type: Boolean, default: false},
    deliveryInstructions: {type: String, required: false},
    latitude: {type: Number, required: false},
    longitude: {type: Number, required: false},
});

module.exports = mongoose.model('Address', AddressSchema);