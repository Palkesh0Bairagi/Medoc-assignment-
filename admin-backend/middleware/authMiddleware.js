const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify token and extract user info
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
  if (!token) return res.status(401).json({ message: "Unauthorized." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user data (including ID) to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

// Middleware to check if the user is an admin
exports.isAdmin = async (req, res, next) => {
  try {
    // Find the user from the database using the ID attached to req.user
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access. Admin role required.",
      });
    } else {
      next(); // If the user is an admin, proceed to the next middleware or route handler
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error checking admin role.",
    });
  }
};
