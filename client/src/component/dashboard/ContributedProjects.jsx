import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Cookies from 'js-cookie';
import axios from 'axios'; // Ensure you have axios installed for API requests
import { FaCopy, FaCheck } from 'react-icons/fa';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const ContributedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [copiedRoomId, setCopiedRoomId] = useState(null);
  const token = Cookies.get('tokens');


  useEffect(() => {
    // Replace with your API endpoint
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms/user', {
          headers: {
            'cookies': token,  
          }
        });
        
        if(response){
          console.log(response.data);
          
        }
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching rooms', error);
      }
    };
    
    fetchRooms();
  }, []);

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
      <h3>My Projects</h3>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Team Members</th>
            <th>Status</th>
            <th>Room Id</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.projectName}</td>
              <td>{project.users.map(user => (
                  <div key={user._id}>{user.username}</div>
                ))}</td>
              <td>{project.status}</td>
              <td>
                <span>{project.roomId}</span>
                {' '}
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderTooltip(props, project.roomId)}
                >
                  <button
                    onClick={() => handleCopy(project.roomId)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'white',
                    }}
                    aria-label="Copy Room ID"
                  >
                    {copiedRoomId === project.roomId ? <FaCheck /> : <FaCopy />}
                  </button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ContributedProjects;
