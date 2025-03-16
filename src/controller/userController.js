const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const Student = require("../models/student");
const Instructor = require("../models/instructor");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await Admin.findOne({ email });
        if (user && user.status !== "DELETED" && await bcrypt.compare(password, user.password)) {
            return res.status(200).json({ name: user.name });
        }

        user = await Student.findOne({ email });
        if (user && user.status !== "DELETED" && await bcrypt.compare(password, user.password)) {
            return res.status(200).json({ name: user.name });
        }

        user = await Instructor.findOne({ email });
        if (user && user.status !== "DELETED" && await bcrypt.compare(password, user.password)) {
            return res.status(200).json({ name: user.name });
        }

        res.status(401).json({ error: "Invalid email or password" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        let user;
        if (role === "student") {
            user = new Student({ name, email, password: hashedPassword });
        } else if (role === "instructor") {
            user = new Instructor({ name, email, password: hashedPassword });
        } else {
            return res.status(400).json({ error: "Invalid role" });
        }

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { role, id } = req.params;
    try {
        let user;
        if (role === "admin") {
            user = await Admin.findById(id);
        } else if (role === "student") {
            user = await Student.findById(id);
        } else if (role === "instructor") {
            user = await Instructor.findById(id);
        } else {
            return res.status(400).json({ error: "Invalid role" });
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.status = "DELETED";
        await user.save();
        res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.find({ status: { $ne: "DELETED" } }).select("name email status");
        res.status(200).json(instructors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};