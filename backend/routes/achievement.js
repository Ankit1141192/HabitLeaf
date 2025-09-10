const express = require("express");
const Achievement = require("../models/Achievement");
const router = express.Router();

router.get("/", async (req, res) => {
  const achievements = await Achievement.find();
  res.json(achievements);
});

router.post("/", async (req, res) => {
  const achievement = new Achievement(req.body);
  await achievement.save();
  res.json(achievement);
});

module.exports = router;
