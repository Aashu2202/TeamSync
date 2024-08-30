// controllers/roomController.js
const Room = require('../Model/Room');
const User = require('../Model/userModel');

const createRoom = async (req, res) => {
  const { projectName, githubRepoLink, createdAt, codespaceLink, roomId } = req.body;
  const adminId = req.user.user;

  try {
    // Check if the user is an admin
    const user = await User.findById(adminId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create rooms' });
    }

    // Create the room
    const room = new Room({
      projectName,
      githubRepoLink,
      createdAt,
      codespaceLink,
      roomId,
      adminId,
    });

    await room.save();

    return res.status(201).json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createRoom,
};
