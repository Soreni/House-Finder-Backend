const express = require('express');
const feedbackController = require('../controller/feedback');
const auth = require('../middleware/verifyToken');
const router = express.Router();



router.post("/register", feedbackController.createFeedback);

router.get("/:id",  feedbackController.getFeedback);

router.get("/", feedbackController.getAll);

router.put("/:id", feedbackController.updateFeedback);

router.delete("/:id", feedbackController.deleteFeedback);


// Expose the Router
module.exports = router;