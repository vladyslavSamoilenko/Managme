const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: String,
  description: String,
  priority: { type: String, enum: ['low','medium','high'] },
  storyId: { type: Schema.Types.ObjectId, ref: 'Story' },
  estimatedHours: Number,
  state: { type: String, enum: ['todo','doing','done'], default: 'todo' },
  createdAt: { type: Date, default: Date.now },
  startedAt: Date,
  completedAt: Date,
  assignedUserId: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Task', TaskSchema);
