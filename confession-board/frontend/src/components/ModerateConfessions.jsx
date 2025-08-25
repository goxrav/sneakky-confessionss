import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";

const ModerateConfessions = () => {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending confessions on mount
  useEffect(() => {
    const fetchConfessions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/confess/pending");
        setConfessions(res.data);
      } catch (err) {
        toast.error("Failed to fetch confessions 😓");
      } finally {
        setLoading(false);
      }
    };
    fetchConfessions();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/confess/${id}/approve`);
      toast.success("✅ Confession approved!");
      setConfessions((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      toast.error("Failed to approve confession ❌");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/confess/${id}`);
      toast.error("🗑️ Confession deleted.");
      setConfessions((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      toast.error("Failed to delete confession");
    }
  };

  const handleReport = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/confess/${id}/report`);
      toast("🚩 Confession reported.");
    } catch (err) {
      toast.error("Failed to report confession");
    }
  };

  return (
    <PageWrapper>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-pink-600 dark:text-pink-300">
        ⏳ Pending Confessions
      </h2>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading...</p>
      ) : confessions.length === 0 ? (
        <p className="text-green-600 font-semibold">🎉 All confessions reviewed!</p>
      ) : (
        <div className="space-y-6">
          {confessions.map((confess) => (
            <motion.div
              key={confess._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-2xl shadow-lg bg-white/60 dark:bg-gray-700/60 border border-pink-200 dark:border-pink-700"
            >
              <p className="text-lg">{confess.message}</p>
              <div className="mt-3 flex flex-wrap justify-end gap-3">
                <button
                  onClick={() => handleApprove(confess._id)}
                  className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => handleDelete(confess._id)}
                  className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  🗑️ Delete
                </button>
                <button
                  onClick={() => handleReport(confess._id)}
                  className="px-4 py-2 rounded-full bg-yellow-400 text-black hover:bg-yellow-500"
                >
                  🚩 Report
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
    </PageWrapper>
  );
};

export default ModerateConfessions;
