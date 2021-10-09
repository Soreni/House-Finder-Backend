const User = require('../dal/user');
const validate = require('../models/user');
const _ = require('lodash');


//create a user 
module.exports.createUser =async (req, res)=> {
    const body = req.body;
  
     const {error}= validate(body);
     if(error) return res.status(404).json(error.details[0].message);
      
     let user = await User.check({ phoneNumber: body.phoneNumber })
     if (!user) return  res.status(400).json('Invalid User');
     await User.update(user._id,body);
     res.status(200).json("Successfully  Registered!");
   };
  
   //register a user as signup
module.exports.createUser2 =async (req, res)=> {
    const body = req.body;

     const {error}= validate(body);
     if(error) return res.status(404).json(error.details[0].message);
      await User.create({
        email: req.body.email,
        password: req.body.password,
        countryCode: req.body.countryCode,
        phoneNumber: req.body.phoneNumber,      
        verificationCode:req.body.verificationCode,
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