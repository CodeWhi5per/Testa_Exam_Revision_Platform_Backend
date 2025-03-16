const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    status: { type: String, default: null },
});

module.exports = mongoose.model("Instructor", InstructorSchema);