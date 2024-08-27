// services/taskService.js
const Task = require("../models/Task");

// Create a new task
const createTask = async ({ title, description, dueDate, priority, email }) => {
  // Additional validation or error handling can go here
  return await Task.create({
    title,
    description,
    dueDate,
    priority,
    email,
    status: "pending",
  });
};

// Get all tasks
const getAllTasks = async ({ email }) => {
  return await Task.find({ email: email }).sort({ dueDate: -1 });
};

// Get task by ID
const getTaskById = async (id) => {
  console.log(id);
  return await Task.find({ _id: id });
};

// Update task
const updateTask = async (
  id,
  email,
  { title, description, dueDate, priority, status }
) => {
  console.log(id);
  const task = await Task.findById({ _id: id });

  if (task) {
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    task.status = status;
    task.email = email;
    return await task.save();
  }
  return null;
};

// Delete task
const deleteTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  return task ? true : false;
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
