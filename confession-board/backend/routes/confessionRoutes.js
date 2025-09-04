const express = require("express");
const router = express.Router();
const Confession = require("../models/Confession"); // ✅ import model
const { getAdminStats } = require("../controllers/confessionController");
const {
  getApprovedConfessions,
  reactToConfession,
  reportConfession,
  undoReaction,
} = require("../controllers/confessionController");
// Test route
router.get("/test", (req, res) => {
  console.log("✅ /api/confess/test hit");
  res.send("Test route is working!");
});

// POST route to save to MongoDB
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    const newConfession = new Confession({ message });
    await newConfession.save(); // ✅ Save to DB

    console.log("✅ Confession saved to DB:", newConfession);

    res.status(201).json({
      success: true,
      message: "Confession saved!",
      data: newConfession,
    });
  } catch (error) {
    console.error("❌ Error saving confession:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});
// GET all approved confessions
router.get("/", async (req, res) => {
  try {
    const confessions = await Confession.find({ isApproved: true }).sort({
      createdAt: -1,
    });
    res.json(confessions);
  } catch (err) {
    console.error("❌ Error fetching confessions:", err.message);
    res.status(500).json({ error: "Failed to fetch confessions" });
  }
});
router.get("/pending", async (req, res) => {
  try {
    const pendingConfessions = await Confession.find({ isApproved: false }).sort({ createdAt: -1 });
    res.status(200).json(pendingConfessions);
  } catch (err) {
    console.error("Error fetching pending confessions:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.patch("/:id/approve", async (req, res) => {
  try {
    const updated = await Confession.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Confession not found" });
    res.json({ success: true, message: "Confession approved" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Confession.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Confession not found" });
    res.json({ success: true, message: "Confession deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
router.patch("/:id/report", async (req, res) => {
  try {
    const updated = await Confession.findByIdAndUpdate(
      req.params.id,
      { $inc: { reports: 1 } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Confession not found" });
    res.json({ success: true, message: "Confession reported" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
// GET /api/confess/approved
router.get("/approved", async (req, res) => {
  try {
    const approvedConfessions = await Confession.find({ isApproved: true }).sort({ createdAt: -1 }).limit(5);
    res.json(approvedConfessions);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/reported", async (req, res) => {
  try {
    const reportedConfessions = await Confession.find({ reports: { $gt: 0 } });
    res.status(200).json(reportedConfessions);
  } catch (error) {
    console.error("Error fetching reported confessions:", error);
    res.status(500).json({ error: "Server error while fetching reported confessions." });
  }
});


router.patch("/:id/approve", async (req, res) => {
  try {
    await Confession.findByIdAndUpdate(req.params.id, { reported: false, reports: 0 });
    res.json({ message: "Confession approved and report cleared." });
  } catch {
    res.status(500).json({ error: "Approval failed" });
  }
});

router.patch("/:id/delete", async (req, res) => {
  try {
    await Confession.findByIdAndDelete(req.params.id);
    res.json({ message: "Confession deleted successfully." });
  } catch {
    res.status(500).json({ error: "Deletion failed" });
  }
});

router.patch("/:id/reset-report", async (req, res) => {
  try {
    await Confession.findByIdAndUpdate(req.params.id, { reported: false, reports: 0 });
    res.json({ message: "Report status reset." });
  } catch {
    res.status(500).json({ error: "Reset failed" });
  }
});


router.patch("/:id/react", reactToConfession);
router.post("/:id/report", reportConfession);


router.delete("/:id/react", undoReaction);    // for undoing a reaction


router.get("/stats", getAdminStats);

module.exports = router;
