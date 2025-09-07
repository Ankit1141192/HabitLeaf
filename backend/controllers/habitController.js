// controllers/habitController.js
import HabitTracker from "../models/HabitTracker.js";

// Create a new habit
export const createHabit = async (req, res) => {
  try {
    const { userId, habitName } = req.body;

    const habit = new HabitTracker({ userId, habitName });
    await habit.save();

    res.status(201).json({ success: true, data: habit });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all habits for a user
export const getHabits = async (req, res) => {
  try {
    const { userId } = req.params;
    const habits = await HabitTracker.find({ userId });

    res.status(200).json({ success: true, data: habits });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Toggle habit completion for today
export const toggleHabit = async (req, res) => {
  try {
    const { habitId } = req.params;

    const habit = await HabitTracker.findById(habitId);
    if (!habit) return res.status(404).json({ success: false, message: "Habit not found" });

    const today = new Date().toDateString();

    // Check if already completed today
    const existing = habit.history.find(
      (h) => new Date(h.date).toDateString() === today
    );

    if (existing) {
      existing.completed = !existing.completed;
    } else {
      habit.history.push({ date: new Date(), completed: true });
      habit.lastCompleted = new Date();

      // Update streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (
        habit.history.some(
          (h) => new Date(h.date).toDateString() === yesterday.toDateString()
        )
      ) {
        habit.streak += 1;
      } else {
        habit.streak = 1;
      }
    }

    await habit.save();
    res.status(200).json({ success: true, data: habit });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete habit
export const deleteHabit = async (req, res) => {
  try {
    const { habitId } = req.params;
    await HabitTracker.findByIdAndDelete(habitId);

    res.status(200).json({ success: true, message: "Habit deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
