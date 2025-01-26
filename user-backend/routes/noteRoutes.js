const express = require("express");
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/notes", verifyToken, getNotes);
router.post("/notes", verifyToken, createNote);
router.patch("/notes/:id", verifyToken, updateNote);
router.delete("/notes/:id", verifyToken, deleteNote);

module.exports = router;
