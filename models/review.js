const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    placeId: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },

    age: {
        type: String,
        required: false
    },
    reviewd: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

const reviewModel = mongoose.model('review', reviewSchema)

module.exports = reviewModel