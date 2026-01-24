const express = require("express");
const app = express();

app.use(express.json());

const notes = [];

// GET all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// POST create note
app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.status(201).json({
    message: "Note created",
    data: req.body,
  });
});

// PUT update whole note by index
app.put("/notes/:index", (req, res) => {
  const index = req.params.index;

  if (!notes[index]) {
    return res.status(404).json({ message: "Note not found" });
  }

  notes[index] = req.body; // replace full object
  res.json({ message: "Note updated", data: notes[index] });
});

// PATCH update part of note
app.patch("/notes/:index", (req, res) => {
  const index = req.params.index;

  if (!notes[index]) {
    return res.status(404).json({ message: "Note not found" });
  }

  notes[index] = { ...notes[index], ...req.body };
  res.json({ message: "Note partially updated", data: notes[index] });
});

// DELETE note by index
app.delete("/notes/:index", (req, res) => {
  const index = req.params.index;

  if (!notes[index]) {
    return res.status(404).json({ message: "Note not found" });
  }

  notes.splice(index, 1);
  res.json({ message: "Note deleted" });
});

// start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
