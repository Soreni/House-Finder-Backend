const express = require('express');
const userController = require('../controller/house');
const auth = require('../middleware/verifyToken');
const router = express.Router();



router.post("/register", userController.createHouse);

router.get("/:id", userController.getHouse);

router.get("/", userController.getAll);

router.put("/:id",auth, userController.updateHouse);

router.delete("/:id",auth, userController.deleteHouse);


// Expose the Router
module.exports = router;