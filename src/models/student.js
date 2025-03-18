const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: "student" },
    status: { type: String, default: null },
});

module.exports = mongoose.model("Student", StudentSchema);