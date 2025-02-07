import React, { useState } from "react";

function NewTask({ addTask, setForm }) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [important, setImportant] = useState(false);
  const [isCompleted, setStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ description, category, date, time, important, isCompleted });
    setDescription("");
    setCategory("");
    setDate("");
    setTime("");
    setImportant(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold text-gray-800 mb-4">New Task</h1>
        <input
          type="text"
          placeholder="Add a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Class Work">Class Work</option>
          <option value="Home Work">Home Work</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <div className="flex items-center mb-4">
          <label className="text-gray-700 mr-2">Important?</label>
          <input
            type="checkbox"
            checked={important}
            onChange={(e) => setImportant(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
        >
          Done
        </button>
      </form>
    </div>
  );
}

export default NewTask;
