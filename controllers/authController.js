const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("../config/db");
const dotenv = require("dotenv");
dotenv.config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const db = await connectDB();
  const usersCollection = db.collection("users");
  const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into DB
  await usersCollection.insertOne({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User registered successfully" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const db = await connectDB();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Create a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Login successful", token });
};

//user logout
const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };
