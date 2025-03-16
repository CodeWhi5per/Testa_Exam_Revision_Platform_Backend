const express = require("express");
const router = express.Router();
const examController = require("../controller/examController");

router.get("/getDepartments", examController.getAllDepartments);
router.get("/getCourses", examController.getAllCourses);

module.exports = router;