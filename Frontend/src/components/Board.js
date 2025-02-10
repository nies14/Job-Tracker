import React from 'react';
import Column from './Column';
import { COLUMN_IDS, COLUMN_NAMES } from '../utils/constants';

const Board = ({ tasks, onMoveTask, onDelete }) => {
  return (
    <div className="board">
      {Object.entries(COLUMN_NAMES).map(([columnId, title]) => (
        <Column
          key={columnId}
          columnId={columnId}
          title={title}
          tasks={tasks[columnId] || []}
          moveTask={onMoveTask}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default Board;
