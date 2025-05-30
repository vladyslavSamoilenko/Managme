const mongoose = require('mongoose');
const { Schema } = mongoose;

const StorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  state: { type: String, enum: ['todo','doing','done'], default: 'todo' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', StorySchema);