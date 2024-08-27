// app/services/authService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

exports.registerUser = async (name, email, password) => {
  try {
    // Check if the user already exists

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return { message: "User registered successfully" };
  } catch (error) {
    throw error;
  }
};
exports.findUser = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: true };
    }
    return { error: false };
  } catch (error) {
    console.log(error);
  }
};
exports.loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      throw { status: 401, message: "Invalid credentials" };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw { status: 401, message: "Invalid credentials" };
    }

    const userObject = user.toObject();

    // Delete the password property
    delete userObject.password;

    const token = jwt.sign({ userId: userObject._id }, process.env.JWT_SECRET);

    console.log("user", userObject);

    return { ...userObject, token };
  } catch (error) {
    throw error;
  }
};
