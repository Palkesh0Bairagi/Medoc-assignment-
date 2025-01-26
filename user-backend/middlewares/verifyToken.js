const jwt = require("jwt-simple");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Add user info to request object
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
