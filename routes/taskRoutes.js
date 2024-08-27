const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(verifyToken, createTask).get(verifyToken, getTasks);

router
  .route("/:id")
  .get(verifyToken, getTaskById)
  .put(verifyToken, updateTask)
  .delete(verifyToken, deleteTask);

module.exports = router;
