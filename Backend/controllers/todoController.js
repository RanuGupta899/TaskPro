const ToDos = require("../model/todosmodel");
const User = require("../model/usermodel");

// Create ToDo Controller
const createToDos = async (req, res, next) => {
  try {
    const { email, description, category, date, time, important, isCompleted } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    // Create a new ToDo entry
    const todos = new ToDos({
      userId: user._id, // Use the MongoDB _id as userId
      description,
      category,
      date,
      time,
      important,
      isCompleted,
    });

    // Save the ToDo entry to the database
    await todos.save();

    // Send the created ToDo as a response
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json(`Failed to create ToDos, ${error.message}`);
  }
};

// Get ToDo Controller
const getTodos = async (req, res, next) => {
  try {
    const { email } = req.query;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("User not found");
    }

    // Fetch todos for the user
    const todos = await ToDos.find({ userId: user._id }).sort({
      createdAt: -1, // Fixed typo
    });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json(`Failed to get ToDos, ${error.message}`);
  }
};

// Delete ToDo Controller
const deleteToDo = async (req, res, next) => {
  try {
    const { email, todoId } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("User not found");
    }

    // Delete the ToDo item
    const deleted = await ToDos.findOneAndDelete({
      _id: todoId,
      userId: user._id, // Match by user's _id
    });

    if (deleted) {
      return res.status(200).json("ToDo item deleted successfully");
    } else {
      return res.status(400).json("ToDo item not found");
    }
  } catch (error) {
    res.status(500).json(`Failed to delete ToDo, ${error.message}`);
  }
};

// Update ToDo Status Controller
const updateToDo = async (req, res, next) => {
  try {
    const { email, todoId, isCompleted } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("User not found");
    }

    // Update the ToDo item
    const updated = await ToDos.findOneAndUpdate(
      { _id: todoId, userId: user._id }, // Match by user's _id
      { isCompleted },
      { new: true }
    );

    if (updated) {
      return res.status(200).json("ToDo status updated successfully");
    } else {
      return res.status(400).json("ToDo item not found");
    }
  } catch (error) {
    res.status(500).json(`Failed to update ToDo status, ${error.message}`);
  }
};

// Edit ToDo Controller
const editToDo = async (req, res, next) => {
  try {
    const { email, todoId, description, time, date } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("User not found");
    }

    // Edit the ToDo item
    const updated = await ToDos.findOneAndUpdate(
      { _id: todoId, userId: user._id }, // Match by user's _id
      { description, time, date },
      { new: true }
    );

    if (updated) {
      return res.status(200).json("ToDo edited successfully");
    } else {
      return res.status(400).json("ToDo item not found");
    }
  } catch (error) {
    res.status(500).json(`Failed to edit ToDo, ${error.message}`);
  }
};

module.exports = { createToDos, getTodos, deleteToDo, updateToDo, editToDo };
