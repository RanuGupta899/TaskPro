import React, { useState } from "react";

function TaskItem({ task, deleteTask, toggleCompleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newTime, setTime] = useState(task.time);
  const [newDate, setDate] = useState(task.date);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleEdit = () => {
    if (isEditing) {
      editTask(task._id, newDescription, newTime, newDate);
    }
    setIsEditing(!isEditing);
  };

  const handleComplete = (isCompleted) => {
    toggleCompleteTask(task._id, !isCompleted);
    if (!isCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const formattedDate = new Date(task.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div
    className={`p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col space-y-4 transform transition duration-300 hover:scale-105 ${
      task.isCompleted ? "opacity-50 line-through" : ""
    }`}
  >
    {showConfetti && task.isCompleted && (
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, index) => (
          <div
            key={index}
            className="absolute rounded-full"
          
          ></div>
        ))}
      </div>
    )}
  
    {isEditing ? (
      <div className="flex flex-col space-y-3">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <input
          type="time"
          className="border border-gray-300 p-2 rounded-md"
          value={newTime}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="date"
          className="border border-gray-300 p-2 rounded-md"
          value={newDate}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
    ) : (
      <div className="text-center">
        <h3 className="text-lg font-semibold">{task.description}</h3>
        <p className="text-sm text-gray-500">{formattedDate}</p>
        <p className="text-sm text-gray-500">{task.time}</p>
      </div>
    )}
  
    <div className="text-sm text-gray-700 text-center">
      <span className="font-medium">Category:</span> {task.category}
    </div>
    
    <div className="text-center">
      {task.important ? (
        <i className="bi bi-star-fill text-yellow-400 text-lg"></i>
      ) : (
        <i className="bi bi-star text-lg"></i>
      )}
    </div>
  
    <div className="flex justify-around mt-4">
      <button onClick={() => handleComplete(task.isCompleted)} className="text-green-500 hover:text-green-700">
        <i className={task.isCompleted ? "bi bi-arrow-counterclockwise" : "bi bi-check-circle"}></i>
      </button>
      <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700">
        <i className={isEditing ? "bi bi-save" : "bi bi-pencil-square"}></i>
      </button>
      <button onClick={() => deleteTask(task._id)} className="text-red-500 hover:text-red-700">
        <i className="bi bi-trash"></i>
      </button>
    </div>
  </div>
  
  );
}

export default TaskItem;
