const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser,
  auditNotes,
} = require("../controllers/adminController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/users", verifyToken, isAdmin, getUsers);
router.get("/users/:id", verifyToken, isAdmin, getUser);
router.delete("/users/:id", verifyToken, isAdmin, deleteUser);
router.get("/audit/notes", verifyToken, isAdmin, auditNotes);

module.exports = router;
