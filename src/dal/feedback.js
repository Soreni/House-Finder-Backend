const FeedBack = require('../models/feedback');


//create feedback
const create = async function(feedbackData){  

    let feedback = new FeedBack(feedbackData);
    await feedback.save();
    return feedback;
}




 /**
 * get a feedback with given id from db .
 */
  const getById = async function (_id) {
    let feedback = await FeedBack.findById(_id);
    return feedback;
  }

   /**
 * get all feedback from db .
 */
    const getById = async function () {
        let feedback = await FeedBack.find();
        return feedback;
      }

       /**
   * Delete a feedback
   */
  const deleteById = async function(id) {
    let feedback = await FeedBack.findByIdAndRemove(id,{new:true});
    return feedback;
  }