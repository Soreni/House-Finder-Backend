const House = require('../dal/house');
const validate = require('../models/house');
const _ = require('lodash');


//create a house 
module.exports.createHouse =async (req, res)=> {
    const body = req.body; 
     const {error}= validate(body);
     if(error) return res.status(404).json(error.details[0].message);
      
   let house = await House.check({ houseNumber: body.houseNumber });
      if (house) return  res.status(400).json(`House is already registered under ${body.houseNumber} house number`);
      body.postedBy = 
      house = await House.create(body);
     res.status(200).json("Successfully  Registered!");
   };

   

 
   exports.getHouse = async (req, res)=> {
    const house = await House.getById(req.params.id);
    if (!house) return res.status(404).json("The house is not found!!!");
    res.status(200).json(_.pick(house,['_id','houseType','furnished','floor','price','localAreaName','houseGPS','price']));
    
};

// Get all of Users
exports.getAll = async (req, res)=> {
  try{
    let house = await House.getAll()
   // res.status(200).json(_.map(house,_.partialRight(_.pick,['_id','houseType','furnished','floor'])))
    res.status(200).json(house);
  }
     catch{(err)=>console.log(err)};
  }

    /**
   * Update a User 
   * 
   * 
   */
  exports.updateHouse = async (req, res)=> {
       const body  = req.body; 
       const {error}= validate(body);
       if(error) return res.status(404).json(error.details[0].message);
        let house = await  House.update({ _id: req.params.id }, body);
        res.status(200).json(_.pick(house,['_id','houseType','furnished','floor','price']));
    };
  
    exports.deleteHouse = async (req, res)=>  {    
          let house = await  House.deleteById(req.params.id);
          res.status(200).json(_.pick(house,['_id','houseType','furnished','floor','price']));
  
    };