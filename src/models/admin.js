const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: "admin" },
    status: { type: String, default: null },
});

module.exports = mongoose.model("Admin", AdminSchema);