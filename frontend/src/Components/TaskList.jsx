import React from "react";
import TaskItem from "./TaskItem";
import NoTasks from "./NoTask";

function TaskList({ tasks, deleteTask, toggleCompleteTask, editTask, current, setForm }) {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">{`${current} Tasks`}</h2>
        <p className="text-gray-600">Keep going, you're doing great!</p>
      </div>

      <div
        className="flex items-center justify-between text-gray-500 cursor-pointer hover:text-gray-800"
        onClick={() => setForm()}
      >
        <span className="text-lg">Add a new item</span>
        <i className="bi bi-plus-square text-2xl"></i>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              deleteTask={deleteTask}
              toggleCompleteTask={toggleCompleteTask}
              editTask={editTask}
            />
          ))
        ) : (
          <NoTasks />
        )}
      </div>
    </div>
  );
}

export default TaskList;
