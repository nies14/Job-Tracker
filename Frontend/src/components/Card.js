import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ task, fromColumn, onDelete }) => {
  if (!task) return null;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { 
      id: task.id,
      taskId: task.id,
      task: task,
      fromColumn 
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [task.id, fromColumn, task]);

  return (
    <div 
      ref={drag} 
      className="card" 
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move'
      }}
    >
      <div className="card-header">
        <div className="card-field">
          <span className="field-label">Company Name:</span>
          <h3>{task.companyName}</h3>
        </div>
        <button 
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
        >
          ×
        </button>
      </div>
      <div className="card-field">
        <span className="field-label">Job Description:</span>
        <p>{task.jobDescription}</p>
      </div>
      <div className="card-field">
        <span className="field-label">Notes:</span>
        <p>{task.notes || 'No notes added'}</p>
      </div>
    </div>
  );
};

export default Card;
