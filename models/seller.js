const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
    },
    birthday: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    phonenumber: {
      type: Number,
      required: false,
    },

    password: {
      type: String,
      required: true,
    },
    isSeller: {
      type: Boolean,
      default: true,
    },
    isSetup: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const sellerModel = mongoose.model("sellers", sellerSchema);

module.exports = sellerModel;
