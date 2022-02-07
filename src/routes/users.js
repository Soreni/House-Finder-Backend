const express = require("express");
const userController = require("../controller/user");
const auth = require("../middleware/verifyToken");
const router = express.Router();

router.post("/register", userController.createUser);

router.get("/:id", auth, userController.getUser);

router.get("/", userController.getAll);
router.get("/:id/houses", userController.getAllHouses);

router.put("/:id", auth, userController.updateUser);

router.delete("/:id", userController.deleteUser);

// Expose the Router
module.exports = router;
