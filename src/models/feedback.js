const mongoose = require('mongoose');
const Joi = require('joi');
const User = require('./user');



const FeedBackSchema = new mongoose.Schema({
    message:{
        type: String,
        maxlength:255,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: User // model name
       
    },
    dateCreate:{
        type: Date,
        default:Date.now
    }
    });
    const FeedBack = mongoose.model('FeedBack',FeedBackSchema);
    function validateFeedBack(feedback){
        const schema = {
            message: Joi.string().max(255)               
            }
            return Joi.validate(feedback);
    }
    
    module.exports = FeedBack;
    exports.validate = validateFeedBack;