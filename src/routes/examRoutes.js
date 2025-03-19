const express = require("express");
const router = express.Router();
const multer = require("multer");
const examController = require("../controller/examController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), examController.uploadExam);
router.get("/getDepartments", examController.getAllDepartments);
router.get("/getCourses", examController.getAllCourses);
router.get("/getExams", examController.getExams);
router.get("/getApprovedExams", examController.getApprovedExams);
router.get("/examApproval/:examId/:status", examController.examApproval);
router.post("/buyExams", examController.buyExam);
router.get("/getPurchasedExams/:examId/:userId", examController.getPurchasedExams);
router.get("/getExamsByAuthor/:authorId", examController.getExamsByAuthor);

module.exports = router;