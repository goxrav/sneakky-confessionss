const express = require('express');
const router = express.Router();
const Confession = require('../models/Confession');
const { getAdminStats } = require("../controllers/confessionController");
// 📊 Admin stats route
router.get('/stats', async (req, res) => {
  try {
    const total = await Confession.countDocuments();
    const pending = await Confession.countDocuments({ isApproved: false });
    const reported = await Confession.countDocuments({ reports: { $gt: 0 } });

    res.json({
      totalConfessions: total,
      pendingReviews: pending,
      reportedPosts: reported
    });
  } catch (err) {
    console.error("❌ Failed to fetch admin stats:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});


// routes/confessRoutes.js




module.exports = router;
