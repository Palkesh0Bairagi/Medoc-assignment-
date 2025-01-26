const Note = require("../models/Note");

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createNote = async (req, res) => {
  const { title, description } = req.body;
  try {
    const note = new Note({ title, description, user: req.user.id });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, description, status },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndDelete({ _id: id, user: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(204).send({ message: "deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
