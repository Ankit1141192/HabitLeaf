// routes/habitRoutes.js
import express from "express";
import {
  createHabit,
  getHabits,
  toggleHabit,
  deleteHabit,
} from "../controllers/habitController.js";

const router = express.Router();

// Create a new habit
router.post("/", createHabit);

// Get all habits for a user
router.get("/:userId", getHabits);

// Toggle habit completion
router.put("/toggle/:habitId", toggleHabit);

// Delete a habit
router.delete("/:habitId", deleteHabit);

export default router;
