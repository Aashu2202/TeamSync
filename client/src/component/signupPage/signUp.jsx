import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the styles
import "./signUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        username,
        email,
        password,
        contact,
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Container fluid className="signup-page d-flex align-items-center justify-content-center">
      <Row className="signup-wrapper p-4 rounded justify-content-center">
        <Col md={12} className="signup-content">
          <div className="text-center">
            <h2 className="signup-logo">TeamSync</h2>
            <p className="signup-desc">Share your ideas with your team</p>
          </div>
          <Form onSubmit={handleSignUp}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="signup-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="signup-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="signup-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="signup-input"
              />
            </Form.Group>

            <PhoneInput
              placeholder="Contact Number"
              value={contact}
              onChange={setContact}
              country={'us'}
              inputProps={{
                required: true,
                autoFocus: false,
              }}
              containerClass="signup-input-container"
              inputClass="signup-input"
            />

            <Button variant="primary" type="submit" className="w-100 mt-2 signup-button">
              Sign Up
            </Button>
          </Form>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          <div className="text-center mt-3">
            <Link to="/login">Log In</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
