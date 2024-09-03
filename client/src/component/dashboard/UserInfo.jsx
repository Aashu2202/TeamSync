import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './UserInfo.css';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    profile: '',
    name: '',
    email: '',
    contact: ''
  });

  useEffect(() => {
    // Get user info directly from cookies
    const profile = Cookies.get('profile');
    const name = Cookies.get('name');
    const email = Cookies.get('email');
    const contact = Cookies.get('contact');
    setUserInfo({ profile, name, email, contact });
  }, []);

  return (
    <Container fluid className="user-info-page">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={8} lg={12} xl={10} className="user-info-wrapper p-4 rounded">
          <Row>
            <Col className="text-center mb-4">
              <h2 className="user-info-logo">User Info</h2>
              {/* <p className="user-info-description">Update your profile details</p> */}
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="text-center mb-3">
                <div className="profile-picture-container">
                  <img src={userInfo.profile || 'default-profile-url'} alt="Profile" className="profile-picture" />
                </div>
              </div>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInfo.name}
                    readOnly
                  />
                </Form.Group>
                
                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={userInfo.email}
                    readOnly
                  />
                </Form.Group>

                <Form.Group controlId="formContact" className="mt-3">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInfo.contact}
                    readOnly
                  />
                </Form.Group>
                
                {/* <div className="text-center mt-4">
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => console.log('Edit functionality can be implemented here')}
                  >
                    Edit Profile Picture
                  </Button>
                </div> */}
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInfo;
