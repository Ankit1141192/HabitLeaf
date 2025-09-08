const Habit = require("../models/Habit");

// Get all habits by user
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.params.userId });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create habit
exports.createHabit = async (req, res) => {
  try {
    const { userId, text } = req.body;
    const habit = new Habit({ userId, text });
    const saved = await habit.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update habit
exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    habit.completed = req.body.completed ?? habit.completed;
    habit.text = req.body.text ?? habit.text;

    const updated = await habit.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete habit
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    await habit.deleteOne();
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
