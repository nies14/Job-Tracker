import React, { useState } from 'react';

const AddJobForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState({
    companyName: '',
    jobDescription: '',
    notes: ''
  });

  const handleAddTask = () => {
    if (newTask.companyName.trim() && newTask.jobDescription.trim()) {
      onAddTask(newTask);
      setNewTask({ companyName: '', jobDescription: '', notes: '' });
    }
  };

  return (
    <div className="add-job-form">
      <div className="form-row">
        <div className="left-column">
          <div className="input-group">
            <input
              type="text"
              placeholder="Company Name"
              value={newTask.companyName}
              onChange={(e) => setNewTask({...newTask, companyName: e.target.value})}
            />
            <input
              type="text"
              placeholder="Job Description"
              value={newTask.jobDescription}
              onChange={(e) => setNewTask({...newTask, jobDescription: e.target.value})}
            />
          </div>
        </div>
        <div className="right-column">
          <textarea
            placeholder="Notes"
            value={newTask.notes}
            onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
            className="notes-input"
          />
        </div>
      </div>
      <button onClick={handleAddTask}>Add Job</button>
    </div>
  );
};

export default AddJobForm;
