const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const habitRoutes = require("./routes/habit.routes");

// Middleware
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware setup
app.use(cors({ origin: process.env.CLIENT_URL || "*" })); // allow frontend origin
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("🌱 Welcome to HabitLeaf API");
});

// Route mounting
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/habits", habitRoutes);

// Global error handler (last middleware)
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

startServer();
