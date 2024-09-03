import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import Cookies from "js-cookie";

const CreateTaskForm = ({ onTaskCreated, onClose }) => {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const token = Cookies.get('tokens');

  useEffect(() => {
    // Fetch rooms for the authenticated user
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms/projects', {
          headers: {
            'cookies': token,
          }
        });
        console.log(response.data);
        
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms', error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    // Fetch users for the selected room
    if (selectedRoom) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/rooms/${selectedRoom}/users`, {
            headers: {'cookies': token }  
          });
          setUsers(response.data.users); // Adjust based on your API response structure
        } catch (error) {
          console.error('Error fetching users', error);
        }
      };

      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [selectedRoom]);

  const handleRoomChange = (e) => {
    console.log(e.target.value);
    
    setSelectedRoom(e.target.value);
  };

  const handleUserChange = (e) => {
    const { value, checked } = e.target;
    setSelectedUsers((prev) =>
      checked ? [...prev, value] : prev.filter((user) => user !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(taskDescription, selectedRoom, selectedUsers);
    
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        projectId: selectedRoom,
        users: selectedUsers,
        taskDescription,
      }, {
        headers: {'cookies': token }  
      });
      onTaskCreated(response.data);
      onClose();
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formRoom" className='mb-2'>
        <Form.Label>Select Room</Form.Label>
        <Form.Control as="select" value={selectedRoom} onChange={handleRoomChange}>
          <option value="">Select a room</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.projectName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {users.length > 0 && (
        <Form.Group controlId="formUsers">
          <Form.Label>Select Users</Form.Label>
          {users.map((user) => (
            <Form.Check
              key={user._id}
              type="checkbox"
              id={`user-${user._id}`}
              label={user.username}
              value={user._id}
              onChange={handleUserChange}
            />
          ))}
        </Form.Group>
      )}

      <Form.Group controlId="formTaskDescription" className='mb-3'>
        <Form.Label>Task Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className='me-2'>
        Create Task
      </Button>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Form>
  );
};

export default CreateTaskForm;
