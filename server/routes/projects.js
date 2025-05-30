const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  const list = await Project.find();
  res.json(list);
});

// Create project
router.post('/', async (req, res) => {
  const p = new Project(req.body);
  await p.save();
  res.status(201).json(p);
});

// Update project
router.put('/:id', async (req, res) => {
  const p = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
});

// Delete project
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;