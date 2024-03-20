const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({

    userid: {
        type: String,
        required: true
    },
    tripname: {
        type: String,
        required: true
    },
    tripnote: {
        type: String,
        required: true
    },
    tripdays: {
        type: String,
        required: true
    },
    tripbudget: {
        type: String,
        required: true
    },
    do: [],
    eat: [],
    stay: [],

    isComplete: {
        type: Boolean,
        default: false
    },


}, {
    timestamps: true,
})

const tripModel = mongoose.model('trip', tripSchema)

module.exports = tripModel