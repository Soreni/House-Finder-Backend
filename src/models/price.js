const mongoose = require('mongoose');
const Joi = require('joi');
const House = require('./house');



const priceSchema = new mongoose.Schema({
    currency:{
        type: String,
        minlength: 2,
        maxlength:5
    },
      house_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: House // model name
       
    },
    downPayment:{
        type: Number,
        maxlength:6
    },
    billingPlan:{
        type: String,
        enum: ['daily','monthly','quarterly','annualy'],
        default: 'monthly',
    }
    });
    const Price = mongoose.model('Price',priceSchema);
    function validatePrice(price){
        const schema = {
            currency: Joi.string().min(2).max(5),
            downPayment: Joi.string().max(6),
            billingPlan: Joi.string(),
                
            }
            return Joi.validate(price);
    }
    
    module.exports = Price;
    exports.validate = validatePrice;