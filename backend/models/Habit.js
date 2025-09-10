const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    default: "daily"
  },
  daysOfWeek: { type: [Boolean], default: [false, false, false, false, false, false, false] },
  completedDates: { type: [Date], default: [] },
  streak: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Habit", habitSchema);
