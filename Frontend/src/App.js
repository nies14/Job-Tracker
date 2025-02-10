import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './components/Board';
import AddJobForm from './components/AddJobForm';
import { COLUMN_IDS } from './utils/constants';
import { getAllJobs, createJob, updateJobStatus, deleteJob } from './services/jobService';

const App = () => {
  const [tasks, setTasks] = useState({
    [COLUMN_IDS.DETAILS]: [],
    [COLUMN_IDS.IN_PROGRESS]: [],
    [COLUMN_IDS.ACCEPTED]: [],
    [COLUMN_IDS.REJECTED]: []
  });

  useEffect(() => {
    loadJobs();
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

  const handleAddTask = async (task) => {
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="app-header">
          <h1>Job Application Tracker</h1>
          <p>Organize and track your job applications in one place</p>
        </div>
        <AddJobForm onAddTask={handleAddTask} />
        <Board 
          tasks={tasks} 
          onMoveTask={handleMoveTask} 
          onDelete={handleDeleteTask}
        />
      </div>
    </DndProvider>
  );
};

export default App;
