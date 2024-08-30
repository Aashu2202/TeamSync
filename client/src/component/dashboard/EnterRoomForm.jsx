// src/EnterRoomForm.js

import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

const EnterRoomForm = ({ onClose }) => {
  const [codespaceLink, setCodespaceLink] = useState('');
  const [roomId, setRoomId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (codespaceLink && roomId) {
      window.location.href = '/terminal'; // Redirect to /terminal after submission
    }
  };

  return (
    <Container>
      <div className="enter-room-form">
        <Button variant="link" className="close-button" onClick={onClose}>
          <FaTimes />
        </Button>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCodespaceLink">
            <Form.Label>Codespace Link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter codespace link"
              value={codespaceLink}
              onChange={(e) => setCodespaceLink(e.target.value)}
              required
            />
          </Form.Group>

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
