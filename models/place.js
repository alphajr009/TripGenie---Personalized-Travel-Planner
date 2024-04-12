const mongoose = require("mongoose");

const placeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    googlemaplink: {
      type: String,
      required: false,
    },
    opentime: {
      type: String,
      required: true,
    },
    endtime: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    likedusers: [],
    
    isPublic: {
      type: Boolean,
      default: false
  }
  },
  {
    timestamps: true,
  }
);

const placeModel = mongoose.model("place", placeSchema);

module.exports = placeModel;
