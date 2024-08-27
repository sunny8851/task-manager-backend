const express = require("express");
const dotenv = require("dotenv");
require("./config/db");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoute");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();
app.use("/api/tasks", taskRoutes);
app.use("/api/user", authRoutes);
app.get("*", (req, res) => {
  req.status(404).send("error");
});
app.listen(5000, async () => {
  console.log("server listening on 5000");
});
