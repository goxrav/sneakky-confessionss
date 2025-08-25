const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const { getAdminStats } = require("./controllers/confessionController"); // <== Import admin controller

const app = express();
const PORT = 5000;

// 🧠 Connect to MongoDB
connectDB();

// 🔌 Middlewares
app.use(cors());
app.use(express.json());

// 🧪 Test route
app.get("/", (req, res) => {
  res.send("🔥 Sneakky Confessions Backend is running");
});

// ✅ API routes
const confessionRoutes = require("./routes/confessionRoutes");
const adminRoutes = require("./routes/adminRoutes"); // <== Add this line

app.use("/api/confess", confessionRoutes);
app.use("/api/admin", adminRoutes); // <== Mount admin route
app.use("/api/confess", require("./routes/confessionRoutes"));

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// <== Add admin stats route
module.exports = app;
