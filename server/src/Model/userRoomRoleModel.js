// /models/userRoomRoleModel.js

const mongoose = require('mongoose');

const userRoomRoleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
});

userRoomRoleSchema.index({ user: 1, room: 1 }, { unique: true });

module.exports = mongoose.model('UserRoomRole', userRoomRoleSchema);
