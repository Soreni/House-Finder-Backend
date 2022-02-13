const express = require("express");
const houseController = require("../controller/house");
const auth = require("../middleware/verifyToken");
const router = express.Router();

router.post("/register", auth, houseController.createHouse);

router.get("/:id", houseController.getHouse);

router.get("/", houseController.getAll);

router.put("/:id", auth, houseController.updateHouse);

router.delete("/:id", houseController.deleteHouse);

// Expose the Router
module.exports = router;
