import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios'; // Ensure you have axios installed for API requests

const MyProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint
    axios.get('/api/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects', error);
      });
  }, []);

  return (
    <div>
      <h3>My Projects</h3>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Team Members</th>
            <th>Last Update Date</th>
            <th>Last Update Time</th>
            <th>Branch Name</th>
          </tr>
        </thead>
        <tbody>
          {/* {projects.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.teamMembers}</td>
              <td>{project.lastUpdateDate}</td>
              <td>{project.lastUpdateTime}</td>
              <td>{project.branchName}</td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </div>
  );
};

export default MyProjects;
