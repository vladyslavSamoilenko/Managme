const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  const list = await User.find();
  res.json(list);
});

// Create user
router.post('/', async (req, res) => {
  const u = new User(req.body);
  await u.save();
  res.status(201).json(u);
});

// Update user
router.put('/:id', async (req, res) => {
  const u = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(u);
});

// Delete user
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;