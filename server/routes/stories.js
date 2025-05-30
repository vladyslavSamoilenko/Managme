const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// Get all stories
router.get('/', async (req, res) => {
  const list = await Story.find();
  res.json(list);
});

// Create new story
router.post('/', async (req, res) => {
  const s = new Story(req.body);
  await s.save();
  res.status(201).json(s);
});

// Update story
router.put('/:id', async (req, res) => {
  const s = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(s);
});

// Delete story
router.delete('/:id', async (req, res) => {
  await Story.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
