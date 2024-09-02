import React, { useState } from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { FaUser, FaProjectDiagram, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { FaCodeMerge } from "react-icons/fa6";
import './dashboard.css';
import UserInfo from './UserInfo';
import MyProjects from './MyProjects';
import CreateRoomForm from './CreateRoomForm';
import EnterRoomForm from './EnterRoomForm';
import ContributedProjects from './ContributedProjects';
import Cookies from 'js-cookie';
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState(null);
  const [showCreateRoomForm, setShowCreateRoomForm] = useState(false);
  const [showEnterRoomForm, setShowEnterRoomForm] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelect = (section) => {
    setSelectedSection(section);
    if (section !== 'createRoom' && section !== 'enterRoom') {
      setShowCreateRoomForm(false);
      setShowEnterRoomForm(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove('tokens');
    Cookies.remove('contact');
    Cookies.remove('email');
    Cookies.remove('name');
    Cookies.remove('profile');
    Cookies.remove('tokens');
    Cookies.remove('token');
    window.location.href = '/login';
  };

  const handleCreateRoom = () => {
    setShowCreateRoomForm(true);
  };

  const handleEnterRoom = () => {
    setShowEnterRoomForm(true);
  };

  const handleCloseCreateRoomForm = () => {
    setShowCreateRoomForm(false);
  };

  const handleCloseEnterRoomForm = () => {
    setShowEnterRoomForm(false);
  };

  const handleRoomCreated = (codespaceLink) => {
    // No need to open a new tab here since it's already handled in CreateRoomForm
    setShowCreateRoomForm(false); // Close the form after creating the room
  };

  const renderContent = () => {
    if (showCreateRoomForm) {
      return <CreateRoomForm onRoomCreated={handleRoomCreated} onClose={handleCloseCreateRoomForm} />;
    }
    if (showEnterRoomForm) {
      return <EnterRoomForm onClose={handleCloseEnterRoomForm} />;
    }
    switch (selectedSection) {
      case 'userInfo':
        return <UserInfo />;
      case 'myProjects':
        return <MyProjects />;
      case 'contributedProjects':
        return <ContributedProjects />;
      default:
        return null;
    }
  };

  return (
    <Container fluid className="dashboard" noGutters>
      <Row noGutters>
        <Col md={3} className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
          <div className="sidebar-header d-flex justify-content-between">
            {isSidebarOpen && <h2 className="text-center">My App</h2>}
            <Button
              variant="link"
              className="sidebar-toggle"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </Button>
          </div>
          <Nav className="flex-column">
            <Nav.Link onClick={() => handleSelect('userInfo')}>
              <FaUser />
              {isSidebarOpen && <span className="menu-item-text">User Info</span>}
            </Nav.Link>
            <Nav.Link onClick={() => handleSelect('myProjects')}>
              <FaProjectDiagram />
              {isSidebarOpen && <span className="menu-item-text">My Projects</span>}
            </Nav.Link>
            <Nav.Link onClick={() => handleSelect('contributedProjects')}>
            <FaCodeMerge />
              {isSidebarOpen && <span className="menu-item-text">All Projects</span>}
            </Nav.Link>
          </Nav>
          <div className="sidebar-footer">
            <Nav.Link onClick={handleLogout}>
              <FaSignOutAlt />
              {isSidebarOpen && <span className="menu-item-text">Logout</span>}
            </Nav.Link>
          </div>
        </Col>
        <Col md={9} className={`content ${isSidebarOpen ? 'expanded' : 'compressed'}`}>
          <div className="button-group mb-4">
            <Button variant="primary" onClick={handleCreateRoom}>
              Create Room
            </Button>
            <Button variant="secondary" onClick={handleEnterRoom}>
              Enter Room
            </Button>
          </div>
          <div className="section-content">
            {renderContent()}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
