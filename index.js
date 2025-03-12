const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  res.status(404).send("Route not Found, Check the Route!");
});
//handling 500 error
app.use((req, res, next) => {
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
