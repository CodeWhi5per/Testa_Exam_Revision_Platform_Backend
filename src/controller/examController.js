const Department = require("../models/department");
const Course = require("../models/course");
const Exam = require("../models/exam");
const BuyExam = require("../models/buyExam");
const Student = require("../models/student");

exports.getAllDepartments = async (req, res) => {
    const departments = await Department.find();
    res.json(departments);
};

exports.getAllCourses = async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
};

exports.uploadExam = async (req, res) => {
    const { authorId, author, name, department, course, level, unitName, description, price, topics } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: "File is required" });
    }

    const filePath = req.file.path;

    try {
        const exam = new Exam({
            authorId,
            author,
            name,
            department,
            course,
            level,
            unitName,
            description,
            filePath,
            price,
            topics: JSON.parse(topics),
        });

        await exam.save();
        res.status(201).json({ message: "Exam uploaded successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllDepartments = async (req, res) => {
    const departments = await Department.find();
    res.json(departments);
};

exports.getAllCourses = async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
};

exports.getExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getApprovedExams = async (req, res) => {
    try {
        const approvedExams = await Exam.find({ status: "Approved" });
        res.status(200).json(approvedExams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.examApproval = async (req, res) => {
    const { examId, status } = req.params;

    if (!["Approved", "Rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    try {
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ error: "Exam not found" });
        }

        exam.status = status;
        await exam.save();
        res.status(200).json({ message: `Exam ${status.toLowerCase()} successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.buyExam = async (req, res) => {
    const { examId, userId, status } = req.body;

    try {
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ error: "Exam not found" });
        }

        const student = await Student.findById(userId);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        const buyExam = new BuyExam({
            examId,
            userId,
            status,
        });

        await buyExam.save();
        res.status(201).json({ message: "Exam purchased successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getPurchasedExams = async (req, res) => {
    const { examId, userId } = req.params;

    try {
        const buyExam = await BuyExam.findOne({ examId, userId });
        if (!buyExam) {
            return res.status(404).json({ error: "Purchased exam not found" });
        }

        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ error: "Exam not found" });
        }

        res.status(200).json(exam);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getExamsByAuthor = async (req, res) => {
    const { authorId } = req.params;

    try {
        const exams = await Exam.find({ authorId });
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};