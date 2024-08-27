const mongoose = require("mongoose");
const dotenv = require("dotenv");
mongoose.set("strictQuery", true);
dotenv.config({ path: "./config.env" });
const DATABASE = process.env.DATABASE;
mongoose
  .connect(DATABASE)
  .then((e) => console.log("MongoDB connected"))
  .catch((e) => console.log(e));
