
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import NewTask from "./NewTask";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function Main() {
  const [tasks, setTasks] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todo/", {
        params: { email },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks!", error);
    }
  };

  const handleLogout = () => {
    enqueueSnackbar("Logout Successfully 🎉");
    setTimeout(() => navigate("/"), 500);
  };

  const addTask = async (task) => {
    try {
      await axios.post("http://localhost:5000/todo/create", { ...task, email });
      enqueueSnackbar("New task added 🎉");
      fetchTasks();
      setFormVisible(false);
    } catch (error) {
      console.error("Error creating the task!", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete("http://localhost:5000/todo/delete", {
        data: { email, todoId: id },
      });
      enqueueSnackbar("Task deleted 🎉");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting the task!", error);
    }
  };

  const toggleCompleteTask = async (id, isCompleted) => {
    try {
      await axios.put("http://localhost:5000/todo/update-status", {
        email,
        todoId: id,
        isCompleted,
      });
      enqueueSnackbar(isCompleted ? "Task completed 🎉" : "Task restored 🎉");
      fetchTasks();
    } catch (error) {
      console.error("Error updating the task status!", error);
    }
  };

  const editTask = async (id, description, time, date) => {
    try {
      await axios.put("http://localhost:5000/todo/edit", {
        email,
        todoId: id,
        description,
        time,
        date,
      });
      enqueueSnackbar("Task updated 🎉");
      fetchTasks();
    } catch (error) {
      console.error("Error updating the task!", error);
    }
  };

  const categories = ["All", "Class Work", "Home Work", "Completed"];

  const filterTasks = (category) => {
    return tasks?.filter((task) => {
      const isNotCompleted = !task.isCompleted;
      const taskCategory = task.category?.trim().toLowerCase();
      const selectedCategory = category.trim().toLowerCase();

      return selectedCategory === "all"
        ? isNotCompleted
        : selectedCategory === "completed"
        ? task.isCompleted
        : taskCategory === selectedCategory && isNotCompleted;
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 bg-teal-900 text-gray-300 p-4 ${
          isSidebarVisible ? "w-64" : "w-36"
        }`}
      >
        <div className="p-4 text-center">
          <h1 className="text-lg font-bold text-white">TaskManager</h1>
        </div>
        <nav className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`block w-full px-4 py-2 rounded ${
                currentCategory === category
                  ? "bg-gray-500 text-white"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setCurrentCategory(category);
                setFormVisible(false);
              }}
            >
              {category}
            </button>
          ))}
          <button
            className="block w-full px-4 py-2 rounded hover:bg-gray-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {!formVisible ? (
          <TaskList
            setForm={() => setFormVisible(true)}
            current={currentCategory}
            tasks={filterTasks(currentCategory)}
            deleteTask={deleteTask}
            toggleCompleteTask={toggleCompleteTask}
            editTask={editTask}
          />
        ) : (
          <NewTask addTask={addTask} />
        )}
      </div>

      {/* Sidebar Toggle Button */}
      <button
        className="m-12 absolute bottom-4 p-2 bg-yellow-500 text-white rounded shadow-lg"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        =
      </button>
      
      {/* Snackbar Provider */}
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
      />
    </div>
  );
}

export default Main;

