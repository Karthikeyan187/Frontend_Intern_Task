const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');

// Create
router.post('/', auth, async (req, res) => {
  const note = new Note({ ...req.body, user: req.user.id });
  await note.save();
  res.json(note);
});

// Read (with search query ?q= & tag filter ?tag=)
router.get('/', auth, async (req, res) => {
  const { q, tag } = req.query;
  const filter = { user: req.user.id };
  if (q) filter.$or = [{ title: { $regex: q, $options: 'i' }}, { content: { $regex: q, $options: 'i' }}];
  if (tag) filter.tags = tag;
  const notes = await Note.find(filter).sort({ createdAt: -1 });
  res.json(notes);
});

// Update
router.put('/:id', auth, async (req, res) => {
  const note = await Note.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
  res.json(note);
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ msg: 'Deleted' });
});

module.exports = router;
