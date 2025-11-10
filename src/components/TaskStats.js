import React from "react";

function TaskStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percentage = total ? ((completed / total) * 100).toFixed(1) : 0;

  return (
    <div style={{ marginTop: 20 }}>
      <p>Total Tasks: {total}</p>
      <p>Completed: {completed} ({percentage}%)</p>
    </div>
  );
}

export default TaskStats;
