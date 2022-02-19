const House = require("../models/house");

//create house
const create = async function (houseData) {
  let house = new House(houseData);
  await house.save();
};

/**
 * get a house with given housenumber from db .
 */
const check = async function (houseNumber) {
  let house = await House.findOne(houseNumber);
  return house;
};

/**
 * get a house with given id from db .
 */
const getById = async function (_id) {
  let house = await House.findById(_id).populate("postedBy");
  return house;
};

/**
 * Fetch houses
 */
const getAll = async function () {
  let house = await House.find().populate("postedBy");

  return house;
};

/**
 * Fetch houses by filter
 */
const getHouse = async function (localAreaName) {
  let house = await House.find({
    isAvailable: true,
    localAreaName: localAreaName,
  });
  return house;
};
/**
 * Update a house
 */
const update = async function (query, houseData) {
  let house = await House.findByIdAndUpdate(query, houseData, { new: true });
  return house;
};

/**
 * Delete a house
 */
const deleteById = async function (id) {
  let house = await House.findByIdAndRemove(id, { new: true });
  return house;
};

module.exports = { create, getAll, getById, update, deleteById, check };
