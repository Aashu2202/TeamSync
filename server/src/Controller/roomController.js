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
    const userId = req.user.user; 

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
      .populate('admin', 'username')  
      .populate('users', 'username'); 

    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms for admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getRoomsByUserId = async (req, res) => {
  const userId = req.user.user;
  console.log(userId);

  try {
    // Find all rooms where the user is in the users list
    const rooms = await Room.find({
      users: userId  // Adjusted query to find rooms where userId is in the users array
    })
    .populate('users', 'username')  // Populate users with their username
    .exec();  // Use exec() to ensure query execution

    // Modify roomId based on project status
    const modifiedRooms = rooms.map(room => {
      return {
        ...room.toObject(),  // Convert Mongoose document to plain object
        roomId: room.status === 'Done' ? '--' : room.roomId  // Modify roomId if status is Done
      };
    });

    console.log(modifiedRooms);
    res.status(200).json(modifiedRooms);
  } catch (error) {
    console.error('Error fetching rooms for user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUsersByRoomId = async (req, res) => {
  const { roomId } = req.params;

  try {
    // Find the room by roomId and populate the users
    const room = await Room.findById(roomId).populate('users', 'username _id'); // Adjust fields as needed

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Return the users in the room
    res.status(200).json({ users: room.users });
  } catch (error) {
    console.error('Error fetching users for room:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const updateRoomStatus = async (req, res) => {
  const { roomId } = req.params;
  const { status } = req.body;

  const userId = req.user.user; // Assuming the user's ID is stored in req.user.user


  try {
    // Check if the room exists
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Check if the user is the admin of the room
    if (room.admin.toString() !== userId) {
      return res.status(403).json({ error: 'Only the admin can update the status.' });
    }

    // Update the room's status
    room.status = status;
    await room.save();

    res.status(200).json({ message: 'Room status updated successfully.', room });
  } catch (error) {
    console.error('Error updating room status:', error);
    res.status(500).json({ error: 'Server error while updating status.' });
  }
};

module.exports = {
  createRoom,
  enterInRoom,
  getRoomsAndProjectsForAdmin,
  updateRoomStatus,
  getUsersByRoomId,
  getRoomsByUserId
};
