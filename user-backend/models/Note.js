const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "active" },
});

module.exports = mongoose.model("Note", noteSchema);
