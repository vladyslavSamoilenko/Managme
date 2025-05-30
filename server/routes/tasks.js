const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
  res.json(await Task.find());
});

router.post('/', async (req, res) => {
  const t = new Task(req.body);
  await t.save();
  res.status(201).json(t);
});

router.put('/:id', async (req, res) => {
  const t = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(t);
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;