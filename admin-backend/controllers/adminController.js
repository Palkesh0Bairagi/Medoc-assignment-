const User = require("../models/User");
const axios = require("axios");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Query to get all users
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users." });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Get user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user." });
  }
};

exports.auditNotes = async (req, res) => {
  try {
    // Fetching notes from Backend 1
    const response = await axios.get("http://localhost:5000/user/notes", {
      headers: {
        Authorization: req.headers.authorization, // Pass the auth token
      },
    });

    // if (!response.data.length) {
    //   return res.status(404).json({ message: "No audit logs found." });
    // }

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching audit logs:", error.message);
    res.status(500).json({
      message: "Error fetching audit logs from Backend 1.",
      error: error.message,
    });
  }
};
