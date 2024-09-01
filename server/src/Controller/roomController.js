const Room = require('../Model/Room');
const UserRoomRole = require('../Model/userRoomRoleModel');
const Project = require('../Model/projectModel');


const createRoom = async (req, res) => {
  const { projectName, githubRepoLink, createdAt, codespaceLink, roomId } = req.body;
  const userId = req.user.user;

  try {
    // Create the Room
    const room = await Room.create({
        roomId,
        projectName,
        githubRepoLink,
        createdAt,
        codespaceLink,
        admin: userId,
        users: [userId], 
    });

    
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
  const { roomId } = req.params;


  console.log("Room ID:", roomId);
  
  try{
    const room = await Room.findOne({roomId: roomId});
    if(!room) {
      return res.status(404).json({message: 'Room not found'});
    }
    res.json(room);
  } catch(error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
  }




  const getRoomsAndProjectsForAdmin = async (req, res) => {
    const userId = req.user.user; // Get user ID from authentication middleware
  
    try {
      // Find all rooms where the user is an admin
      const adminRooms = await UserRoomRole.find({ user: userId, role: 'user' }).populate('room');
  
      
      const roomIds = adminRooms.map(ur => ur.room._id);
  
      const rooms = await Room.find({ _id: { $in: roomIds } })
        .populate('projects')
        .populate({
          path: 'projects',
          populate: {
            path: 'assignedUsers',
            model: 'User'
          }
        });
  
      res.json(rooms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

module.exports = {
  createRoom,
  enterInRoom,
  getRoomsAndProjectsForAdmin
};
