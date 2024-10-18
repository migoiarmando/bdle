const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const auth = require("./auth");
const classRoutes = require("../routes/classRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Use class routes
app.use("/api/classes", classRoutes);

// Use student routes
app.use("/api/students", studentRoutes);

const app = express();
const PORT = process.env.PORT || 5000;

// Use Auth0 middleware
app.use(auth);

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to BDLE - Class Management and Attendance System");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
