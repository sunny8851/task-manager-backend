const taskService = require("../services/task");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const email = req.header("email");
    if (!title || !description || !dueDate || !priority || !email) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    const task = await taskService.createTask({
      title,
      description,
      dueDate,
      priority,
      email,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const email = req.header("email");
    const tasks = await taskService.getAllTasks({ email });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const email = req.header("email");
    const task = await taskService.getTaskById(req.params.id, email);

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const email = req.header("email");
    const updatedTask = await taskService.updateTask(
      req.params.id,
      email,
      req.body
    );

    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const email = req.header("email");
    const taskDeleted = await taskService.deleteTask(req.params.id);

    if (taskDeleted) {
      res.json({ message: "Task removed" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
