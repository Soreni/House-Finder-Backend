const express = require('express');
const userController = require('../controller/user');
const router = express.Router();



router.post("/register", userController.createUser2);

router.get("/:id", userController.getUser);

router.get("/", userController.getAll);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);


// Expose the Router
module.exports = router;