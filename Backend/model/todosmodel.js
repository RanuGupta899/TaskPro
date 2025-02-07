const mongoose = require('mongoose');

// Define the ToDo Schema
const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // References the _id from the User model
      required: true,
      ref: 'User', // Model name for the referenced User schema
    },
    description: {
      type: String,
      required: true, // Assuming a description is mandatory
    },
    category: {
      type: String,
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    important: {
      type: Boolean,
      default: false, // Default value for the important flag
    },
    isCompleted: {
      type: Boolean,
      default: false, // Default value for the completion status
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically set the last update date
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, // Automatically handle timestamps
  }
);

// Define the ToDo Model
const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;
