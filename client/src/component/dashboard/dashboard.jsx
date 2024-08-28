import React, { useState } from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { FaUser, FaProjectDiagram, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './dashboard.css';
import UserInfo from './UserInfo';
import MyProjects from './MyProjects';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelect = (section) => {
    setSelectedSection(section);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'userInfo':
        return <UserInfo />;
      case 'myProjects':
        return <MyProjects />;
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
            <Button variant="primary" onClick={() => {/* handle create room */}}>
              Create Room
            </Button>
            <Button variant="secondary" onClick={() => {/* handle enter room */}}>
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
