const express = require("express");
const Member = require("../models/Member");
const router = express.Router();

router.get("/", async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

router.post("/", async (req, res) => {
  const member = new Member(req.body);
  await member.save();
  res.json(member);
});

router.put("/:id", async (req, res) => {
  const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(member);
});

module.exports = router;
