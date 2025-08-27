import React, { useState, useEffect } from "react";
import {
  LogOut,
  Settings,
  ShieldCheck,
  LayoutDashboard,
  Key,
} from "lucide-react";

import { motion } from "framer-motion";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalConfessions: 0,
    pendingReviews: 0,
    reportedPosts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/stats`);
        setStats(res.data);
      } catch (err) {
        console.error("❌ Failed to load stats:", err);
      }
    };

    fetchStats();
  }, []);

  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/admin");
  };

  const sidebarVariants = {
    open: { width: "16rem" },
    closed: { width: "4.5rem" },
  };

  const statCards = [
    { label: "Total Confessions", value: stats.totalConfessions, color: "bg-pink-300/30" },
    { label: "Pending Reviews", value: stats.pendingReviews, color: "bg-yellow-300/30" },
    { label: "Reported Posts", value: stats.reportedPosts, color: "bg-red-300/30" },
  ];

  return (
    <PageWrapper>
    <div className="flex min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-200 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white">
      {/* Sidebar */}
      <motion.aside
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="h-screen p-4 bg-white/20 dark:bg-gray-700/30 backdrop-blur-lg shadow-lg border-r border-white/10 flex flex-col transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <div className={`text-xl font-bold text-pink-500 dark:text-pink-300 ${!isOpen && "hidden"}`}>
            👑 Admin Panel
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-pink-500 hover:text-pink-700 transition"
            title="Toggle Sidebar"
          >
            {isOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-sm font-medium">
          

          <Link to="/moderate" className="flex items-center gap-3 hover:text-pink-500 transition">
            <ShieldCheck size={20} />
            {isOpen && <span>Moderate</span>}
            {stats.pendingReviews > 0 && (
    <span className="absolute -top-1 -right-2 bg-yellow-500 text-white text-xs rounded-full px-1.5">
      {stats.pendingReviews}
    </span>
  )}
          </Link>

          <Link to="/change-password" className="flex items-center gap-3 hover:text-pink-500 transition">
            <Key size={20} />
            {isOpen && <span>Change Password</span>}
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 mt-auto hover:text-red-500 transition"
          >
            <LogOut size={20} />
            {isOpen && <span>Logout</span>}
          </button>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <motion.h1
          className="text-4xl font-bold mb-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Welcome, Admin 🚀
        </motion.h1>

       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {statCards.map((stat, index) => {
    const content = (
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`p-6 rounded-2xl shadow-md ${stat.color} dark:bg-opacity-20 backdrop-blur-md cursor-pointer`}
      >
        <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
        <p className="text-4xl font-extrabold mt-2 text-pink-600 dark:text-pink-400">
          {stat.value ?? 0}
        </p>
      </motion.div>
    );

    // 🔗 Link to specific routes
    if (stat.label === "Total Confessions") {
      return (
        <Link key={index} to="/feed">
          {content}
        </Link>
      );
    }
    if (stat.label === "Pending Reviews") {
  return (
    <Link key={index} to="/moderate">
      {content}
    </Link>
  );
}


    if (stat.label === "Reported Posts") {
      return (
        <Link key={index} to="/reported">
          {content}
        </Link>
      );
    }

    return (
      <div key={index}>
        {content}
      </div>
    );
  })}
</section>

      </main>
    </div>
    </PageWrapper>
  );
};

export default AdminDashboard;
