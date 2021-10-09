const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('../config/key');

const houseSchema = new mongoose.Schema({
 
    houseType:{
        type: String,
        required: false,
        minlength:3,
        maxlength:50
    },
    furnished:{
        type: Boolean,
        default: false,
    },
    floor: {
        type: String
    },
    unitStructure: {
        type: String,
    },
    usage:{
        type: String
    },
    status: String,
 
    image:{
        data: Buffer,
        type: String
    },
    usage: {
        type: String,
    },
    availableDate: Date,
    houseGPS:{ 
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number], 
          required: true
        }},
    dateCreated:{
    
        type:Date,
        default:Date.now
    },
    dateModified:{
    
        type:Date,
        default:Date.now
    }   
    });
    const House = mongoose.model('User',houseSchema);
    function validateHouse(house){
        const schema = {
            houseType: Joi.string().min(3).max(50),
            furnished: Joi.boolean(),
            floor: Joi.string(),
            unitStructure: Joi.string(),
            status: Joi.string(),
            usage: Joi.string(),
            availableDate: Joi.date(),
            houseGPS: Joi.coordinates()
          
            }
            return Joi.validate(house);
    }
    
    module.exports = House;
    exports.validate = validateHouse;