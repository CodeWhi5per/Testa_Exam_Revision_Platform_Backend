const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/deleteUser/:role/:id", userController.deleteUser);
router.get("/getInstructors", userController.getAllInstructors);

module.exports = router;