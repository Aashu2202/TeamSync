import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaCopy, FaCheck } from 'react-icons/fa';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const MyRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [copiedRoomId, setCopiedRoomId] = useState(null);
  const token = Cookies.get('tokens');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms/projects', {
          headers: {
            'cookies': token,  
          }
        });
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms', error);
      }
    };

    fetchRooms();
  }, [token]);

  const handleCopy = async (roomId) => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopiedRoomId(roomId);
      setTimeout(() => setCopiedRoomId(null), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const renderTooltip = (props, roomId) => (
    <Tooltip id={`tooltip-${roomId}`} {...props}>
      {copiedRoomId === roomId ? 'Copied!' : 'Copy Room ID'}
    </Tooltip>
  );

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
            <th>Admin Username</th>
            <th>Assigned Users</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room._id}>
              <td>
                <span>{room.roomId}</span>
                {' '}
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderTooltip(props, room.roomId)}
                >
                  <button
                    onClick={() => handleCopy(room.roomId)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'white',
                    }}
                    aria-label="Copy Room ID"
                  >
                    {copiedRoomId === room.roomId ? <FaCheck /> : <FaCopy />}
                  </button>
                </OverlayTrigger>
              </td>
              <td>{room.projectName}</td>
              <td>
                <a href={room.githubRepoLink} target="_blank" rel="noopener noreferrer">
                  Repo Link
                </a>
              </td>
              <td>{new Date(room.createdAtTimestamp).toLocaleDateString()}</td>
              <td>
                <a href={room.codespaceLink} target="_blank" rel="noopener noreferrer">
                  Codespace Link
                </a>
              </td>
              <td>{room.admin.username}</td>
              <td>
                {room.users.map(user => (
                  <div key={user._id}>{user.username}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyRooms;
