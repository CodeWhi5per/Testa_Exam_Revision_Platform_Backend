const Department = require("../models/department");
const Course = require("../models/course");

exports.getAllDepartments = async (req, res) => {
    const departments = await Department.find();
    res.json(departments);
};

exports.getAllCourses = async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
};