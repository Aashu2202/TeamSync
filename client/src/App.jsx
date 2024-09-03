import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './component/loginPage/login';
import SignUp from './component/signupPage/signUp';
import Dashboard from './component/dashboard/dashboard';
import axios from 'axios';
import Cookies from 'js-cookie';


function App() {
  axios.defaults.withCredentials = true;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
