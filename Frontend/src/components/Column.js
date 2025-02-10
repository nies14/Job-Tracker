import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

const Column = ({ columnId, title, tasks, addTask, moveTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item) => {
      if (item.fromColumn !== columnId) {
        moveTask(item.task, item.fromColumn, columnId);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  return (
    <div 
      ref={drop} 
      className="column"
      style={{ 
        backgroundColor: isOver ? '#e1e1e1' : '#f0f0f0'
      }}
    >
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        <Card 
          key={index} 
          task={task} 
          fromColumn={columnId}
        />
      ))}
    </div>
  );
};

export default Column;
