// models/Room.js
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  githubRepoLink: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  codespaceLink: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
