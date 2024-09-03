import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaCopy, FaCheck } from 'react-icons/fa';
import CreateTaskForm from './CreateTaskForm'; // Import the CreateTaskForm component
import './taskAssigned.css'; // Import the custom CSS file

const TaskAssigned = () => {
    const [tasks, setTasks] = useState([]);
    const [copiedRoomId, setCopiedRoomId] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [triggerFetch, setTriggerFetch] = useState(false); // Trigger for re-fetching tasks
    const [statusChange, setStatusChange] = useState(false);
    const token = Cookies.get('tokens');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tasks', {
                    headers: {
                        'cookies': token,
                    }
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks', error);
            }
        };

        fetchTasks();
    }, [token, triggerFetch]); // Re-fetch tasks when token or triggerFetch changes

    const handleCopy = async (roomId) => {
        try {
            await navigator.clipboard.writeText(roomId);
            setCopiedRoomId(roomId);
            setTimeout(() => setCopiedRoomId(null), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    const handleShowTaskModal = () => setShowTaskModal(true);
    const handleCloseTaskModal = () => setShowTaskModal(false);

    const handleTaskCreated = (newTask) => {
        setTriggerFetch(!triggerFetch); // Toggle trigger to force re-fetch
    };

    const handleStatusChange = async (roomId, newStatus) => {
        console.log(`Updating roomId: ${roomId}, newStatus: ${newStatus}`);
        try {
          await axios.put(
            `http://localhost:5000/api/tasks/${roomId}/status`,
            { status: newStatus },
            {
              headers: {
                'cookies': token,
              }
            }
          );
          // Update the room's status locally
          setTasks(prevRooms => 
            prevRooms.map(room =>
              room._id === roomId ? { ...room, status: newStatus } : room
            )
          );
    
          if(statusChange){
            setStatusChange(false)
          }else{
            setStatusChange(true)
          }
          console.log('Updated rooms state:', rooms);
        } catch (error) {
          console.error('Error updating status', error);
        }
      };

    return (
        <div>
            <div className='task-header'>
                <h3>My Tasks</h3>
                <Button variant="primary" onClick={handleShowTaskModal}>
                    New Task
                </Button>
            </div>

            <Table striped bordered hover variant="dark" className="mt-3">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Users</th>
                        <th>Admin</th>
                        <th>Task Description</th>
                        <th>Room ID</th>
                        <th>Status</th>    
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.projectId.projectName}</td>
                            <td>
                                {task.users.map(user => (
                                    <div key={user._id}>{user.username}</div>
                                ))}
                            </td>
                            <td>{task.admin.username}</td>
                            <td>{task.taskDescription}</td>
                            <td>
                                <span>{task.projectId.roomId}</span>
                                {' '}
                                <button
                                    onClick={() => handleCopy(task.projectId.roomId)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'white',
                                    }}
                                    aria-label="Copy Room ID"
                                >
                                    {copiedRoomId === task.projectId.roomId ? <FaCheck /> : <FaCopy />}
                                </button>
                            </td>
                            <td>
                                <DropdownButton
                                    id={`dropdown-status-${task._id}`}
                                    title={task.status}
                                    variant="secondary"
                                    onSelect={(selectedKey) => handleStatusChange(task._id, selectedKey)}
                                >
                                    <Dropdown.Item eventKey="Running">Running</Dropdown.Item>
                                    <Dropdown.Item eventKey="Done">Done</Dropdown.Item>
                                    <Dropdown.Item eventKey="Hold">Hold</Dropdown.Item>
                                    <Dropdown.Item eventKey="Delay">Delay</Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Creating Task */}
            <Modal show={showTaskModal} onHide={handleCloseTaskModal} dialogClassName="modal-dark">
                <Modal.Header closeButton>
                    <Modal.Title>Create New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateTaskForm onTaskCreated={handleTaskCreated} onClose={handleCloseTaskModal} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default TaskAssigned;
