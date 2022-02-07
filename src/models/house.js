const mongoose = require("mongoose");
const Joi = require("joi");
const User = require("./user");

const houseSchema = new mongoose.Schema({
  houseType: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // model name
  },
  houseNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  isFurnished: {
    type: Boolean,
    default: false,
  },
  floor: {
    type: String,
  },
  price: {
    type: Number,
  },
  unitStructure: {
    type: String,
  },
  usage: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  images: [
    {
      type: Buffer,
    },
  ],
  availableDate: Date,
  localAreaName: {
    type: String,
    required: true,
  },
  GPSLocation: {
    altitude: {
      type: [String],
      required: false,
    },
    longitude: {
      type: [String],
      required: false,
    },
    latitude: {
      type: [String],
      required: false,
    },
  },
  description: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
    default: Date.now,
  },
});
const House = mongoose.model("House", houseSchema);

function validateHouse(house) {
  const schema = {
    houseType: Joi.string().min(3).max(50),
    postedBy: Joi.string(),
    houseNumber: Joi.string().min(3).max(50),
    isFurnished: Joi.boolean(),
    floor: Joi.string(),
    price: Joi.number(),
    unitStructure: Joi.string(),
    status: Joi.string(),
    usage: Joi.string(),
    availableDate: Joi.date(),
    localAreaName: Joi.string().min(2).max(50),
    GPSLocation: Joi.coordinates(),
    description: Joi.string(),
  };
  return Joi.validate(house);
}

module.exports = House;
exports.validate = validateHouse;
