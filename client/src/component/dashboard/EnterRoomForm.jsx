import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios'; // Ensure axios is installed

const EnterRoomForm = ({ onClose }) => {
  const [roomId, setRoomId] = useState('');
  const [codespaceLink, setCodespaceLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (roomId) {
      try {
        // Fetch room details from backend
        const response = await axios.get(`http://localhost:5000/api/rooms/${roomId}`);
        const room = response.data;
        
        if (room.codespaceLink) {
          // Redirect to the Codespace link
          window.open(room.codespaceLink, "_blank");
          // window.location.href = room.codespaceLink;
        } else {
          alert('No Codespace link found for this room.');
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
        alert('Error fetching room details.');
      }
    }
  };

  return (
    <Container>
      <div className="enter-room-form">
        <Button variant="link" className="close-button" onClick={onClose}>
          <FaTimes />
        </Button>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formRoomId">
            <Form.Label>Room ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" className="mt-3">
            Enter Room
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default EnterRoomForm;
