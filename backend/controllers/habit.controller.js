const Habit = require("../models/Habit");
const mongoose = require("mongoose");

const createHabit = async (req, res) => {
  try {
    const { title, description, frequency, daysOfWeek } = req.body;

    const habit = new Habit({
      title,
      description,
      frequency,
      daysOfWeek: daysOfWeek || [false, false, false, false, false, false, false],
      user: req.user._id
    });

    await habit.save();
    res.status(201).json({ success: true, msg: "Habit created", habit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, habits });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Invalid id" });

    const habit = await Habit.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!habit) return res.status(404).json({ msg: "Habit not found" });

    res.json({ success: true, msg: "Habit updated", habit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findOneAndDelete({ _id: id, user: req.user._id });
    if (!habit) return res.status(404).json({ msg: "Habit not found" });

    res.json({ success: true, msg: "Habit deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
const toggleCompleteToday = async (req, res) => {
  try {
    const { id } = req.params;
    const habit = await Habit.findOne({ _id: id, user: req.user._id });
    if (!habit) return res.status(404).json({ msg: "Habit not found" });

    const today = new Date();
    const todayStr = today.toISOString().slice(0,10);

    const doneToday = habit.completedDates.some(d => new Date(d).toISOString().slice(0,10) === todayStr);
    if (doneToday) {
      // remove today's date
      habit.completedDates = habit.completedDates.filter(d => new Date(d).toISOString().slice(0,10) !== todayStr);
    } else {
      habit.completedDates.push(today);
    }
    const uniqueDates = [...new Set(habit.completedDates.map(d => new Date(d).toISOString().slice(0,10)))];
    uniqueDates.sort((a,b) => new Date(b) - new Date(a));
    let streak = 0;
    let cur = new Date();
    for (let d of uniqueDates) {
      const diffDays = Math.floor((new Date(cur.toISOString().slice(0,10)) - new Date(d)) / (1000*60*60*24));
      if (diffDays === streak) streak++;
      else break;
    }
    habit.streak = streak;
    habit.completedDates = habit.completedDates;
    await habit.save();

    res.json({ success: true, habit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { createHabit, getHabits, updateHabit, deleteHabit, toggleCompleteToday };
