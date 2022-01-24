const Feedback = require('../dal/feedback');
const validate = require('../models/feedback');
const _ = require('lodash');


//create a feedback 
module.exports.createFeedback =async (req, res)=> {
    const body = req.body; 
     const {error}= validate(body);
     if(error) return res.status(404).json(error.details[0].message);
      
      feedback = await Feedback.create(body);
     res.status(200).json({success: true, message:"Successfully  Registered!"});
   };

exports.getFeedback = async (req, res)=> {
    const feedback = await Feedback.getById(req.params.id);
    if (!feedback) return res.status(404).json({success: false, message:"The feedback is not found!!!"});
    res.status(200).json({success: true, feedback});
    
};

// Get all of feedbacks
exports.getAll = async (req, res)=> {
  
    let feedback = await Feedback.getAll();
    res.status(200).json({success: true, feedback});
//   }
//      catch{(err)=>console.log(err)};
 }

    /**
   * Update a feedback 
   * 
   * 
   */
  exports.updateFeedback= async (req, res)=> {
       const body  = req.body; 
       const {error}= validate(body);
       if(error) return res.status(404).json(error.details[0].message);
        let feedback = await  Feedback.update({ _id: req.params.id }, body);
        res.status(200).json({success: true, feedback});
    };
  
    exports.deleteFeedback= async (req, res)=>  {    
          let feedback = await  Feedback.deleteById(req.params.id);
          res.status(200).json({success: true, feedback});
  
    };