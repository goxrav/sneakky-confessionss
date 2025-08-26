import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfessionPreview = () => {
  const [confessions, setConfessions] = useState([]);
  const [activeConfession, setActiveConfession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConfessions = async () => {
      try {
        const res = await axios.get(`${API_BASE}/confess/approved`);
        setConfessions(res.data.slice(0, 5)); // Show only top 5
      } catch (err) {
        console.error("❌ Error fetching confessions:", err);
      }
    };
    fetchConfessions();
  }, []);

 const handleReaction = async (id, type) => {
  try {
    const res = await fetch(`${API_BASE}/confess/${id}/react`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });

    if (!res.ok) throw new Error("Failed to react");

    setConfessions((prev) =>
      prev.map((c) =>
        c._id === id
          ? {
              ...c,
              emojiReactions: {
                ...c.emojiReactions,
                [type]: (c.emojiReactions?.[type] || 0) + 1,
              },
            }
          : c
      )
    );

    toast.success(`Reacted with ${type}!`);
  } catch (err) {
    toast.error("Failed to react");
  }
};


  const handleReport = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/confess/${id}/report`, {
      method: "POST",
    });

    if (!res.ok) throw new Error("Failed to report");

    toast.warning("Confession reported 🚨");
  } catch (err) {
    toast.error("Failed to report");
  }
};



  return (
    <section className="px-4 py-10 bg-white/40 dark:bg-gray-900/50 backdrop-blur-md">
      <Toaster richColors position="top-center" />
      <h2 className="text-3xl font-bold text-center text-pink-500 dark:text-pink-300 mb-8">
        Recent Confessions 🔥
      </h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-transparent pb-4 px-2">
        {confessions.map((confess, index) => (
          <motion.div
            key={index}
            onClick={() => setActiveConfession(confess)}
            className="min-w-[250px] max-w-xs p-6 rounded-2xl shadow-lg bg-white/30 dark:bg-gray-800/50 backdrop-blur-lg border border-white/20 text-gray-800 dark:text-white cursor-pointer transition"
          >
           <div className="text-2xl">💬</div>

<p className="mt-2 text-sm italic line-clamp-3 text-gray-700 dark:text-gray-300 blur-sm hover:blur-none">
  {confess.message}
</p>

{/* ✅ Reaction Preview */}
<div className="flex justify-center gap-3 text-lg mt-3">
  <span>❤️ {confess.emojiReactions?.like || 0}</span>
  <span>😂 {confess.emojiReactions?.laugh || 0}</span>
  <span>😢 {confess.emojiReactions?.sad || 0}</span>
</div>

<div className="mt-2 text-right text-pink-400 dark:text-pink-300 text-xs">💡 Tap to Read More</div>

           
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/feed")}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold shadow hover:scale-105 transition"
        >
          🔍 View Full Feed
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeConfession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setActiveConfession(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-lg w-[90%] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-4 text-2xl font-bold text-gray-700 dark:text-gray-300"
                onClick={() => setActiveConfession(null)}
              >
                ✖️
              </button>
              <p className="text-sm text-gray-800 dark:text-white leading-relaxed whitespace-pre-wrap">
                {activeConfession.message}
              </p>

              <div className="flex justify-center gap-3 text-lg mt-3">
                <button onClick={() => handleReaction(activeConfession._id, "like")}>
                  ❤️ {activeConfession.emojiReactions?.like || 0}
                </button>
                <button onClick={() => handleReaction(activeConfession._id, "laugh")}>
                  😂 {activeConfession.emojiReactions?.laugh || 0}
                </button>
                <button onClick={() => handleReaction(activeConfession._id, "sad")}>
                  😢 {activeConfession.emojiReactions?.sad || 0}
                </button>
              </div>

              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ConfessionPreview;
