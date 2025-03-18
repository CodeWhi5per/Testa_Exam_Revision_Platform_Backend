const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: "instructor" },
    status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Instructor", InstructorSchema);