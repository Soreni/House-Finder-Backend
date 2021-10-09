const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('../config/key');



const userSchema = new mongoose.Schema({
 
    firstName:{
        type: String,
        required: false,
        minlength:3,
        maxlength:50
    },
    lastName:{
        type: String,
        required: false,
        minlength:3,
        maxlength:50
    },
    countryCode: {
        type: String,
        required: true
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
    dateCreated:{
    
        type:Date,
        default:Date.now
    },
    dateModified:{
    
        type:Date,
        default:Date.now
    }   
    });

    userSchema.methods.generateAuthToken = function(){
            return jwt.sign(
                { _id: this._id},
                config.JWT_KEY);
        };

const User = mongoose.model('User',userSchema);

function validateUser(user){
    const schema = {
        firstName: Joi.string().min(3).max(50),
        lastName: Joi.string().min(3).max(50),
        email: Joi.string(),
        password: Joi.string().min(8).required(),
        countryCode: Joi.string().min(3).max(5).required(),
        phoneNumber: Joi.string().min(9).max(14),      
        verificationCode:Joi.string().min(3).max(50),
        isVerified: Joi.boolean()
        }
        return Joi.validate(user,schema);
}

module.exports = User;
exports.validate = validateUser;