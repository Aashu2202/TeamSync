import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode correctly
import Cookies from "js-cookie";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const token = Cookies.get('tokens'); // Replace 'token' with your actual token cookie name
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json",

           },
          withCredentials: true,
        }
      );
  
      if (response.status === 200) {
        const { data: token } = response.data;
        console.log(response);
        
        console.log("response data= " , response.data);
        
        console.log("token= ", token);
  
        // Decode the token to retrieve information
        const decodedToken = jwtDecode(token);
        Cookies.remove({data: token});
        const { name, email, profile, contact } = decodedToken;
        console.log(token);
        
        // Set cookies with the information from the token
        Cookies.set("name", name, { expires: 7, secure: true, sameSite: "Strict" });
        Cookies.set("email", email, { expires: 7, secure: true, sameSite: "Strict" });
        Cookies.set("profile", profile, { expires: 7, secure: true, sameSite: "Strict" });
        Cookies.set("contact", contact, { expires: 7, secure: true, sameSite: "Strict" });
        Cookies.set("tokens", token, { expires: 7, secure: false, sameSite: "Strict" });

        const temp = Cookies.get('token')
        console.log(temp);
        
        

        // Navigate to the dashboard after successful login
        navigate("/dashboard");
      }
    } catch (err) {
      // Handle errors gracefully
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <Container fluid className="login-page">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={8} lg={6} xl={4} className="login-wrapper p-4 rounded shadow">
          <Row>
            <Col className="text-center mb-4">
              <h2 className="login-logo">TeamSync</h2>
              <p className="login-description">Share your ideas with your team</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required
                  />
                </Form.Group>

                <Button type="submit" className="login-button mt-4 w-100">
                  Login
                </Button>
              </Form>
              {error && <p className="text-danger mt-3">{error}</p>}
              <Link to="/signup" className="login-link d-block text-center mt-3">
                Click here if you don't have an account
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
