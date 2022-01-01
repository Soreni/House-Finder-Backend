const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('../config/key');
const House = require('./house');



const userSchema = new mongoose.Schema({
 
    fullName:{
        type: String,
        required: false,
        minlength:5,
        maxlength:50
    },
    countryCode: {
        type: String
    },
    phoneNumber: {
        type: String,
        unique:true,
        required: false,
    },
    email:{
        type: String,
        unique:true,
    },
    password:{
        type: String,
        unique:true,
    },
 
    verificationCode:String,
    isVerified: {
        type: Boolean,
        default: false,
    },
    houses: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'House' // model name
    }],
    dateCreated:{
    
        type:Date,
        default:Date.now
    },
    dateModified:{
    
        type:Date,
        default:Date.now
    }   
    });

    //if jwt needed 
    userSchema.methods.generateAuthToken = function(){
            return jwt.sign(
                { _id: this._id},
                config.JWT_KEY);
        };

const User = mongoose.model('User',userSchema);

function validateUser(user){
    const schema = {
        fullName: Joi.string().min(5).max(50),
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string(),
        countryCode: Joi.string().min(3).max(5),
        phoneNumber: Joi.string().min(9).max(10),      
        verificationCode:Joi.string().min(3).max(50),
        isVerified: Joi.boolean()
        }
        return Joi.validate(user,schema);
}

module.exports = User;
exports.validate = validateUser;