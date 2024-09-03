import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { generateRoomId } from "../../utils/utils";
import { FaTimes } from "react-icons/fa";
import axios from "axios"; // Assuming you're using axios for HTTP requests
import Cookies from "js-cookie";
const CreateRoomForm = ({ onRoomCreated, onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [githubRepoLink, setGithubRepoLink] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [codespaceLink, setCodespaceLink] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isCodespaceLinkDisabled, setIsCodespaceLinkDisabled] = useState(true);

  
  const handleGenerateRoomId = () => {
    const newRoomId = generateRoomId();
    setRoomId(newRoomId);
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    
    // Construct the room data
    const roomData = {
      projectName,
      githubRepoLink,
      createdAt,
      codespaceLink,
      roomId,
    };
    const token = Cookies.get('tokens');
    
    try {
      // Send room data to the backend
      const response = await axios.post("http://localhost:5000/api/rooms/", roomData, {
        headers: {
          'cookies': token,  
        }
      });
      
      // Pass only the codespaceLink to onRoomCreated
      onRoomCreated(codespaceLink);
      
      // Open the codespace link in a new tab
      window.open(codespaceLink, "_blank");
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };
  
  const handleCodespaceLinkRedirect = () => {
    const repo = "your-repo-name"; 
    window.open(`https://github.com/codespaces/new?repo=${repo}`, "_blank");
    setIsCodespaceLinkDisabled(false);
  };

  const isFormValid = projectName && githubRepoLink && createdAt && codespaceLink && roomId;

  return (
    <Container>
      <div className="create-room-form">
        <Button variant="link" className="close-button" onClick={onClose}>
          <FaTimes />
        </Button>
        <Form onSubmit={handleCreateRoom}>
          <Form.Group controlId="formProjectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formGithubRepoLink">
            <Form.Label>GitHub Repo Link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter GitHub repo link"
              value={githubRepoLink}
              onChange={(e) => setGithubRepoLink(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCreatedAt">
            <Form.Label>Created At</Form.Label>
            <Form.Control
              type="date"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCodespaceLink">
            <Form.Label>Codespace Link</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter codespace link"
                  value={codespaceLink}
                  onChange={(e) => setCodespaceLink(e.target.value)}
                  required
                  disabled={isCodespaceLinkDisabled}
                />
              </Col>
              <Col xs="auto" >
                <Button
                  variant="primary"
                  onClick={handleCodespaceLinkRedirect}
                >
                  Get Codespace Link
                </Button>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formRoomId">
            <Form.Label>Room ID</Form.Label>
            <Row>
              <Col>
                <Form.Control type="text" value={roomId} readOnly />
              </Col>
              <Col xs="auto" >
                <Button
                  variant="primary"
                  onClick={handleGenerateRoomId}
                  style = {{width: '165px'}}
                >
                  Generate Room ID
                </Button>
              </Col>
            </Row>
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            className="mt-3"
            disabled={!isFormValid}
          >
            Create Room
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default CreateRoomForm;
