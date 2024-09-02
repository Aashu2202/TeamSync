const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
    },
    projectName: {
        type: String,
        required: true
    },
    githubRepoLink: {
        type: String,
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
    status: {
        type: String,
        enum: ['Running', 'Done', 'Hold', 'Delay'],
        default: 'Running'
    },
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
