const Feedback = require('../models/feedback');


//create feedback
const create = async function(feedbackData){  

    let feedback = new Feedback(feedbackData);
    await feedback.save();
    return feedback;
}




 /**
 * get a feedback with given id from db .
 */
  const getById = async function (_id) {
    let feedback = await Feedback.findById(_id);
    return feedback;
  }

   /**
 * get all feedback from db .
 */
    const getAll = async function () {
        let feedback = await Feedback.find().populate('user_id');
        return feedback;
      }

        /**
   * Update a house
   */
const update = async function(query, feedbackData) {
  let feedback = await Feedback.findByIdAndUpdate(query, feedbackData,{new:true});
  return feedback;
  
}

       /**
   * Delete a feedback
   */
  const deleteById = async function(id) {
    let feedback = await Feedback.findByIdAndRemove(id,{new:true});
    return feedback;
  }

  module.exports = {create, getAll, getById ,update,deleteById};