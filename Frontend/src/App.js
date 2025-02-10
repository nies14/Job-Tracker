import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './components/Board';
import AddJobForm from './components/AddJobForm';
import LoginForm from './components/LoginForm';
import Modal from './components/Modal';
import RegisterForm from './components/RegisterForm';
import { COLUMN_IDS } from './utils/constants';
import { getAllJobs, createJob, updateJobStatus, deleteJob } from './services/jobService';
import { getAuthCookie, clearAuthCookie } from './services/authService';

const App = () => {
  const [tasks, setTasks] = useState({
    [COLUMN_IDS.DETAILS]: [],
    [COLUMN_IDS.IN_PROGRESS]: [],
    [COLUMN_IDS.ACCEPTED]: [],
    [COLUMN_IDS.REJECTED]: []
  });
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  useEffect(() => {
    const { token, user } = getAuthCookie();
    if (token && user) {
      setUser(user);
      loadJobs();
    }
  }, []);

  const loadJobs = async () => {
    try {
      const jobs = await getAllJobs();
      const categorizedJobs = jobs.reduce((acc, job) => {
        if (!acc[job.status]) {
          acc[job.status] = [];
        }
        acc[job.status].push(job);
        return acc;
      }, {
        [COLUMN_IDS.DETAILS]: [],
        [COLUMN_IDS.IN_PROGRESS]: [],
        [COLUMN_IDS.ACCEPTED]: [],
        [COLUMN_IDS.REJECTED]: []
      });
      setTasks(categorizedJobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    loadJobs();
  };

  const handleLogout = () => {
    clearAuthCookie();
    setUser(null);
    setTasks({
      [COLUMN_IDS.DETAILS]: [],
      [COLUMN_IDS.IN_PROGRESS]: [],
      [COLUMN_IDS.ACCEPTED]: [],
      [COLUMN_IDS.REJECTED]: []
    });
  };

  const handleAddTask = async (task) => {
    if (!user) {
      setShowAuthWarning(true);
      return;
    }
    try {
      const newJob = await createJob({
        ...task,
        status: COLUMN_IDS.DETAILS
      });
      setTasks(prev => ({
        ...prev,
        [COLUMN_IDS.DETAILS]: [...prev[COLUMN_IDS.DETAILS], newJob]
      }));
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleMoveTask = async (task, fromColumn, toColumn) => {
    try {
      // Update in the backend
      await updateJobStatus(task._id, toColumn);
      
      // Update local state
      setTasks(prev => {
        const fromTasks = prev[fromColumn].filter(t => t._id !== task._id);
        const toTasks = [...prev[toColumn], { ...task, status: toColumn }];
        return {
          ...prev,
          [fromColumn]: fromTasks,
          [toColumn]: toTasks
        };
      });
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteJob(taskId);
      setTasks(prev => {
        const newTasks = { ...prev };
        Object.keys(newTasks).forEach(columnId => {
          newTasks[columnId] = newTasks[columnId].filter(task => task._id !== taskId);
        });
        return newTasks;
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleRegister = (userData) => {
    setUser(userData);
    loadJobs();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="app-header">
          <div className="header-content">
            <div className="title-section">
              <h1>Job Application Tracker</h1>
              <p>Organize and track your job applications in one place</p>
            </div>
            <div className="auth-section">
              {user ? (
                <div className="user-info">
                  <span>Welcome, {user.email}</span>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowLogin(true)} className="login-button">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
        <AddJobForm onAddTask={handleAddTask} />
        <Board 
          tasks={tasks} 
          onMoveTask={handleMoveTask} 
          onDelete={handleDeleteTask}
        />
        
        <Modal isOpen={showLogin} onClose={() => {
          setShowLogin(false);
          setIsLoginForm(true);
        }}>
          {isLoginForm ? (
            <LoginForm 
              onLogin={handleLogin} 
              onClose={() => setShowLogin(false)}
              switchToRegister={() => setIsLoginForm(false)}
            />
          ) : (
            <RegisterForm
              onRegister={handleRegister}
              onClose={() => setShowLogin(false)}
              switchToLogin={() => setIsLoginForm(true)}
            />
          )}
        </Modal>

        <Modal isOpen={showAuthWarning} onClose={() => setShowAuthWarning(false)}>
          <div className="auth-warning">
            <h3>Authentication Required</h3>
            <p>Please login to add or modify jobs.</p>
            <button onClick={() => {
              setShowAuthWarning(false);
              setShowLogin(true);
            }}>Login</button>
          </div>
        </Modal>
      </div>
    </DndProvider>
  );
};

export default App;
