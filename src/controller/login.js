const User = require('../dal/user');
const Joi = require('joi');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config/key');
const bcrypt = require('bcrypt');


//login a user 
module.exports.loginUser =async (req, res)=> {
    const body = req.body;
  
     const {error}= validate(body);
     if(error) return res.status(404).json(error.details[0].message);
     
     const user = await User.checkUser({ email: body.email})
     if (!user) return  res.status(404).json('Invalid User');
    
     const validPassword = await bcrypt.compare(body.password, user.password)
     if(!validPassword) return res.status(404).json('Invalid Email or Password')

     //create and asign token
     const token = jwt.sign({_id: user._id, email: user.email},config.JWT_KEY)

     res.header('auth-token', token).status(200).json({message: "Logged in...",token});
   };


   function validate(req){
    const schema = Joi.object({
        email: Joi.string().min(8).max(50).required(),
        password: Joi.string().min(4).max(50).required()
        })
   return schema.validate(req);
      
  };