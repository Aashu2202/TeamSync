// /models/roomModel.js

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
    },
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
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],
    createdAtTimestamp: {
        type: Date,
        default: Date.now,
    },
    updatedAtTimestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Room', roomSchema);
