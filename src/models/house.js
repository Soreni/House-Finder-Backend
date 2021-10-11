const mongoose = require('mongoose');
const Joi = require('joi');

const houseSchema = new mongoose.Schema({
 
    houseType:{
        type: String,
        required: true,
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
    localAreaName: {
        type:String,
        required: true,
    },
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
    const House = mongoose.model('House',houseSchema);
    function validateHouse(house){
        const schema = {
            houseType: Joi.string().min(3).max(50),
            furnished: Joi.boolean(),
            floor: Joi.string(),
            unitStructure: Joi.string(),
            status: Joi.string(),
            usage: Joi.string(),
            availableDate: Joi.date(),
            localAreaName: Joi.string().min(2).max(50),
            houseGPS: Joi.coordinates()
          
            }
            return Joi.validate(house);
    }
    
    module.exports = House;
    exports.validate = validateHouse;