const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String, required: false
    },

    email: {
        type: String, required: true
    },
    gender: {
        type: String, required: false
    },
    hometown: {
        type: String, required: false
    },
    birthday: {
        type: String, required: false
    },
    address: {
        type: String, required: false
    },
    phonenumber: {
        type: Number, required: false
    },

    password: {
        type: String, required: true
    },
    favhotles: [],
    favlocations: [],

    isAdmin: {
        type: Boolean, default: false
    },



}, {
    timestamps: true,
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel