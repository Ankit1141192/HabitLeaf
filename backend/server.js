const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const habitRoutes = require("./routes/habit.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("🌱 Welcome to HabitLeaf API");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/habits", habitRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

startServer();
