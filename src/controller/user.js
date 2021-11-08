const User = require('../dal/user');
const validate = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//create a user 
module.exports.loginUser =async (req, res)=> {
    const body = req.body;
  
     const {error}= validate(body);
     if(error) return res.status(404).json(error.details[0].message);
     
     const user = await User.checkUser({ email: body.email})
     if (!user) return  res.status(404).json('Invalid User');
     console.log(user.password)
     const validPassword = await bcrypt.compare(body.password, user.password)
     if(!validPassword) return res.status(404).json('Invalid Email or Password')

     res.status(200).json("Logged in...");
   };
  
   //register a user as signup
module.exports.createUser = async (req, res)=> {
    const body = req.body;

     const {error}= validate(body);
     if(error) return res.status(404).json(error.details[0].message);

     let user = await User.checkUser({ email: body.email })
     if (user) return  res.status(400).json('User Already Registered');

      //hashing password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(body.password, salt);

      await User.create({
        fullName: body.fullName,
        email: body.email,
        password: hashPassword,
        countryCode: body.countryCode,
        phoneNumber: body.phoneNumber,      
        verificationCode:body.verificationCode,
        isVerified: body.isVerified
      });
     res.status(200).json("Successfully  Registered!");
   };
  
   exports.getUser = async (req, res)=> {
    const user = await User.getById(req.params.id);
    if (!user) return res.status(404).json("The client is not found!!!");
    res.status(200).json(_.pick(user,['_id','countryCode','phoneNumber','firstName','lastName']));
    
};

 
// Get all of Users
exports.getAll = async (req, res)=> {
    let user = await User.getAll()
    res.status(200).json(_.map(user,_.partialRight(_.pick,['_id','countryCode','phoneNumber','firstName','lastName'])))
  
  }
    /**
   * Update a User 
   * 
   * 
   */
  exports.updateUser = async (req, res)=> {
       const body  = req.body; 
       const {error}= validate(body);
       if(error) return res.status(404).json(error.details[0].message);
        let user = await  User.update({ _id: req.params.id }, body);
        res.status(200).json(_.pick(user,['_id','countryCode','phoneNumber','firstName','lastName']));
    };
  
    exports.deleteUser = async (req, res)=>  {    
          let user = await  User.deleteById(req.params.id);
          res.status(200).json(_.pick(user,['_id','countryCode','phoneNumber','firstName','lastName']));
  
    };