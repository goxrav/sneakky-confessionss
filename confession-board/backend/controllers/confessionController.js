const Confession = require("../models/Confession");

// 🎯 React to a confession (emoji)
const reactToConfession = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, uuid } = req.body;

    const confession = await Confession.findById(id);
    if (!confession) return res.status(404).json({ error: "Confession not found" });

    // ✅ Ensure .get() and .set() are used for Map types
    const meta = confession.emojiReactionsMeta;
    const users = meta.get(type) || [];

    if (users.includes(uuid)) {
      return res.status(400).json({ error: "Already reacted" });
    }

    // ✅ Safely increment emoji count in Map
    confession.emojiReactions.set(
      type,
      (confession.emojiReactions.get(type) || 0) + 1
    );

    users.push(uuid);
    meta.set(type, users);

    await confession.save();

    res.json({
      success: true,
      updated: Object.fromEntries(confession.emojiReactions), // Ma
    });
     } catch (err) {
    console.error("❌ React error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// PATCH /api/confess/:id/react


// 🔁 Undo a reaction
const undoReaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { emoji, uuid } = req.body;

    const confession = await Confession.findById(id);
    if (!confession) return res.status(404).json({ error: "Confession not found" });

    // ✅ Get current list of UUIDs for the given emoji
    const meta = confession.emojiReactionsMeta;
    const users = meta.get(emoji) || [];

    if (!users.includes(uuid)) {
      return res.status(400).json({ error: "Reaction not found for this user" });
    }

    // ✅ Decrement reaction count safely
    const currentCount = confession.emojiReactions.get(emoji) || 0;
    confession.emojiReactions.set(emoji, Math.max(currentCount - 1, 0));

    // ✅ Remove UUID from emoji meta
    const updatedUsers = users.filter((u) => u !== uuid);
    meta.set(emoji, updatedUsers);

    await confession.save();

    res.json({
      success: true,
      updatedReactions: Object.fromEntries(confession.emojiReactions),
    });
  } catch (err) {
    console.error("❌ Undo error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE /api/confess/:id/react

// 🚨 Report a confession
// POST /api/confess/:id/report
const reportConfession = async (req, res) => {
  try {
    const { id } = req.params;
    const { uuid } = req.body;

    const confession = await Confession.findById(id);
    if (!confession) return res.status(404).json({ error: "Confession not found" });

    // Prevent duplicate reports from same user
    if (confession.reportMeta?.includes(uuid)) {
      return res.status(400).json({ error: "Already reported" });
    }

    confession.reports += 1;
    confession.reportMeta.push(uuid);

    await confession.save();

    res.json({ success: true, message: "Confession reported" });
  } catch (err) {
    console.error("❌ Report error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// 📤 Get approved confessions with sorting
const getApprovedConfessions = async (req, res) => {
  const { sort } = req.query;

  const sortOptions = {
    newest: { createdAt: -1 },
    like: { "emojiReactions.like": -1 },
    laugh: { "emojiReactions.laugh": -1 },
    sad: { "emojiReactions.sad": -1 },
  };

  const sortBy = sortOptions[sort] || { createdAt: -1 };

  try {
    const confessions = await Confession.find({ isApproved: true }).sort(sortBy).lean();
    res.json(confessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch confessions" });
  }
};

const getAdminStats = async (req, res) => {
  try {
    const totalConfessions = await Confession.countDocuments();
    const pendingReviews = await Confession.countDocuments({ isApproved: false });
    const reportedPosts = await Confession.countDocuments({ reports: { $gt: 0 }  });

    res.json({ totalConfessions, pendingReviews, reportedPosts });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};




// ✅ Final export
module.exports = {
  reactToConfession,
  undoReaction,
  reportConfession,
  getApprovedConfessions,
  getAdminStats,
};
