const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['developer','devops'], default: 'developer' }
});

module.exports = mongoose.model('User', UserSchema);