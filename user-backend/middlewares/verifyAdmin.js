const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 1) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = verifyAdmin;
