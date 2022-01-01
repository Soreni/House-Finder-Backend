const User = require('../models/user');



//create user
const create = async function(userData){  

    let user = new User(userData);
    await user.save();
    return user;
}

  /**
 * get a user with given phonNumber or email from db .
 */
const check = async function (phoneNumber) {
    let user = await User.findOne(phoneNumber);
    return user;
  }
   
  /**
 * get a user with given email from db .
 */
const checkUser = async function (email) {
  let user = await User.findOne(email);
  return user;
}
  /**
 * get a user with given id from db .
 */
const getById = async function (_id) {
    let user = await User.findById(_id);
    return user;
  }
  /**
 * Fetch users
 */
const getAll = async function() {
    let user = await User.find();
    return user;
  }
   /**
 * Fetch users
 */
const getAllHouses = async function(_id) {
  let user = await User.find(_id).populate('houses');
  return user;
}
 

  /**
   * Update a user
   */
const update = async function(query, userData) {
    let user = await User.findByIdAndUpdate(query, userData,{new:true});
    return user;
    
  }

    /**
   * Delete a user
   */
  const deleteById = async function(id) {
    let user = await User.findByIdAndRemove(id,{new:true});
    return user;
  }

  module.exports = {create, getAll, getById ,update,deleteById,check, checkUser,getAllHouses};
