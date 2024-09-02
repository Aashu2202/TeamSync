const Room = require('../Model/Room');
const UserRoomRole = require('../Model/userRoomRoleModel');



const createRoom = async (req, res) => {
  const { projectName, githubRepoLink, createdAt, codespaceLink, roomId } = req.body;
  const userId = req.user.user;

  try {
    // Check if the roomId already exists
    const existingRoom = await Room.findOne({ roomId });
    if (existingRoom) {
      return res.status(400).json({ error: 'Room ID already exists. Please choose a different ID.' });
    }

    // Create the Room
    const room = new Room({
      roomId,
      projectName,
      githubRepoLink,
      createdAt,
      codespaceLink,
      admin: userId,
      users: [userId],
    });
    await room.save();

    // Assign the admin role to the user for this room
    await UserRoomRole.create({
      user: userId,
      room: room._id,
      role: 'admin',
    });

    res.status(201).json({ room, message: 'Room created successfully.' });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: 'Server error while creating room.' });
  }
};

const enterInRoom = async (req, res) => {
  try {
    const { roomId } = req.params;  
    const userId = req.user.user; // Get the user ID from the authenticated user

    // Find the Room by roomId
    let room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check if the user is already in the room
    const isUserInRoom = room.users.some(user => user.toString() === userId);

    if (!isUserInRoom) {
      // Add the user to the room's users list
      room.users.push(userId);
      await room.save();
    }

    // Check if the user has a role in this room, if not assign them as a regular user
    let userRoomRole = await UserRoomRole.findOne({ user: userId, room: room._id });

    if (!userRoomRole) {
      userRoomRole = new UserRoomRole({
        user: userId,
        room: room._id,
        role: 'user',
      });
      await userRoomRole.save();
    }

    // Return the updated room details
    res.json(room);
    
  } catch (error) {
    console.error('Error entering room:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



const getRoomsAndProjectsForAdmin = async (req, res) => {
  const userId = req.user.user;  // assuming req.user.user contains the user ID
  try {
    // Find all rooms where the current user is the admin
    const rooms = await Room.find({ admin: userId })
      .populate('admin', 'username')  // Populate admin field with username
      .populate('users', 'username'); // Populate users field with username

    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms for admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

  
module.exports = {
  createRoom,
  enterInRoom,
  getRoomsAndProjectsForAdmin
};
