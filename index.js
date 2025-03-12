const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Auth routes
app.use("/api/auth", authRoutes);

//handling 500 error
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Something went wrong!" });
});

app.use((err, req, res, next) => {
  res.status(404).json({ message: "Route not Found!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
