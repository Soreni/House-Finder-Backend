const express = require('express');
const loginController = require('../controller/login');
const router = express.Router();



router.post("/", loginController.loginUser);



// Expose the Router
module.exports = router;