const mongoose = require("mongoose");

const confessionSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  reports: {
    type: Number,
    default: 0,
  },
  reported: {
  type: Boolean,
  default: false,
},

  reportMeta: {
  type: [String], // UUIDs or IPs
  default: [],
}, 
 status: {
    type: String,
    enum: ["approved", "pending"],
    default: "pending",
  },
 reportCount: {
    type: Number,
    default: 0,
  },

  emojiReactions: {
    type: Map,
    of: Number,
    default: () => new Map(),
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  reactionHistory: {
  type: Map,
  of: String, // e.g., { uuid123: "like", uuid456: "laugh" }
  default: {},
},
emojiReactionsMeta: {
  type: Map,
  of: [String], // ← Array of UUIDs per reaction type
  default: () => new Map(),
},




});

module.exports = mongoose.model("Confession", confessionSchema);
