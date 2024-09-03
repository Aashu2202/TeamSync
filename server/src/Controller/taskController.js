const Task = require('../Model/taskModel'); // Adjust the path as needed
const Room = require('../Model/Room'); // Adjust the path as needed
const User = require('../Model/userModel'); // Adjust the path as needed

const createTask = async (req, res) => {
  const { users, projectId, taskDescription } = req.body;

  console.log(req.body);

  try {
    // Check if the room exists
    const room = await Room.findById(projectId).populate('users', 'username');
    console.log(room);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Create a new task with user details
    const newTask = new Task({
      users,
      projectId,
      taskDescription,
      admin: req.user.user
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getTasks = async (req, res) => {
  const userId = req.user.user;
  console.log(userId);

  try {
    // Find all tasks where the user is in the users list
    const tasks = await Task.find({
      $or: [
        { 'users': userId },  // Match tasks where userId is in the users array
        { 'admin': userId }  // Match tasks where adminId is in the users array
      ]
    })
    .populate('users', 'username')
    .populate('projectId', 'projectName roomId')
    .populate('admin', 'username')

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks for user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  console.log(taskId);
  
  const userId = req.user.user; // Assuming the user's ID is stored in req.user.user


  try {
    // Check if the room exists
    const task = await Task.findById( taskId );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the room's status
    task.status = status;
    await task.save();

    res.status(200).json({ message: 'Room status updated successfully.', task });
  } catch (error) {
    console.error('Error updating room status:', error);
    res.status(500).json({ error: 'Server error while updating status.' });
  }
};
  

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus
};
