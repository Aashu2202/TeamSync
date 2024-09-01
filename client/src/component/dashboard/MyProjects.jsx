// src/component/dashboard/MyRooms.jsx

import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Cookies from 'js-cookie';

const MyRooms = () => {
  const [rooms, setRooms] = useState([]);
  const token = Cookies.get('tokens');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms/projects', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms', error);
      }
    };

    fetchRooms();
  }, [token]);

  return (
    <div>
      <h3>My Rooms</h3>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Project Name</th>
            <th>GitHub Repo Link</th>
            <th>Created At</th>
            <th>Codespace Link</th>
            <th>Admin ID</th>
            <th>Users</th>
            <th>Projects</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <React.Fragment key={room._id}>
              {room.projects.map(project => (
                <tr key={project._id}>
                  <td>{room.roomId}</td>
                  <td>{project.name}</td>
                  <td><a href={room.githubRepoLink} target="_blank" rel="noopener noreferrer">Repo Link</a></td>
                  <td>{new Date(room.createdAt).toLocaleDateString()}</td>
                  <td><a href={room.codespaceLink} target="_blank" rel="noopener noreferrer">Codespace Link</a></td>
                  <td>{room.admin.username}</td>
                  <td>{room.users.map(user => user.username).join(', ')}</td>
                  <td>{project.name}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyRooms;
