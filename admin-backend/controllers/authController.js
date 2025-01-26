const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found." });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, admin: { id: admin._id, name: admin.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
