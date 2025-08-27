import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import Masonry from 'react-masonry-css';
import PageWrapper from "../components/PageWrapper";
const API_BASE = process.env.REACT_APP_API_URL;

const getOrCreateUUID = () => {
  const stored = localStorage.getItem("uuid");
  if (stored) return stored;

  const newId = uuidv4();
  localStorage.setItem("uuid", newId);
  return newId;
};


const ConfessionFeed = () => {
  const [confessions, setConfessions] = useState([]);
  const [sort, setSort] = useState("newest");
  const [reportedConfessions, setReportedConfessions] = useState(
  JSON.parse(localStorage.getItem("reportedConfessions") || "{}")
);

useEffect(() => {
  localStorage.setItem("reportedConfessions", JSON.stringify(reportedConfessions));
}, [reportedConfessions]);

 
 const [viewMode, setViewMode] = useState(() => {
  return localStorage.getItem("viewMode") || "list";
});
const toggleView = () => {
  setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
};

useEffect(() => {
  localStorage.setItem("viewMode", viewMode);
}, [viewMode]);

  const [userReactions, setUserReactions] = useState({});
  const uuid = getOrCreateUUID();
let debounceTimeout = null; 

  const fetchConfessions = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/confess?sort=${sort}`);
      const data = await res.json();
      setConfessions(data);
    } catch (err) {
      console.error("❌ Failed to fetch:", err);
    }
  };

  useEffect(() => {
    
    fetchConfessions();
  }, [sort]);
  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("userReactions") || "{}");
  setUserReactions(saved);
}, []);

// ✅ Save reactions to localStorage whenever userReactions changes
useEffect(() => {
  localStorage.setItem("userReactions", JSON.stringify(userReactions));
}, [userReactions]);

const handleReport = async (id) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/confess/${id}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uuid }),
    });

    const data = await res.json();

    if (res.ok) {
      setReportedConfessions((prev) => ({ ...prev, [id]: true }));
      toast.success("Reported!");
    } else {
      toast.error(data.error || "Failed to report");
    }
  } catch (err) {
    toast.error("❌ Error reporting confession");
  }
};


  const handleReact = (id, type) => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/confess/${id}/react`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, uuid }),
      });

      const data = await res.json();

      if (res.ok) {
        setConfessions((prev) =>
          prev.map((confess) =>
            confess._id === id
              ? {
                  ...confess,
                  emojiReactions: {
                    ...confess.emojiReactions,
                    [type]: data.updated?.[type] ?? ((confess.emojiReactions?.[type] || 0) + 1),
                  },
                }
              : confess
          )
        );
        setUserReactions((prev) => ({
          ...prev,
          [id]: type,
        }));
        toast.success(`Reacted with ${type}!`);
      } else {
        toast.error("❌ Failed to react");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("❌ Error sending reaction");
    }
  }, 300); // 300ms delay
};

  const handleUndoReaction = async (id, type) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/confess/${id}/react`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emoji: type, uuid }), // backend expects `emoji`
    });
 const data = await res.json();
    if (res.ok) {
     
      setConfessions((prev) =>
        prev.map((confess) =>
          confess._id === id
            ? {
                ...confess,
                emojiReactions: data.updatedReactions,
              }
            : confess
        )
      );
      setUserReactions((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      toast.success(`Removed ${type} reaction!`);
    } else {
      toast.error("❌ Failed to undo reaction");
    }
  } catch (err) {
    toast.error("❌ Error undoing reaction");
  }
};


  return (
<PageWrapper>
    <div className="p-4 space-y-6">
      <h2 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-300">
        💌 Public Confessions
      </h2>

    <div className="flex justify-end gap-2 mb-4">
  <button
    onClick={toggleView}
    className="px-4 py-2 rounded-md bg-pink-600 text-white shadow hover:bg-pink-700 transition"
  >
    {viewMode === "grid" ? "🔳 Grid View" : "📃 List View"}
  </button>
</div>
  




      {/* 📜 Confession Cards */}
      {confessions.length === 0 ? (
  <p className="text-center text-gray-500">No confessions yet...</p>
) : (
  <div
    className={`transition-all duration-500 ease-in-out ${
      viewMode === "grid" ? "grid grid-cols-2 gap-6" : "flex flex-col gap-4"
    }`}
  >
    <AnimatePresence>
      {confessions.map((confess) => (
        <motion.div
          key={confess._id}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border-l-4 border-pink-500 hover:shadow-xl transition ${
            viewMode === "grid" ? "h-full" : ""
          }`}
        >
          {/* 💬 Message */}
          <p className="text-lg text-gray-800 dark:text-gray-100 mb-3">
            {confess.message}
          </p>
         



          {/* 🕒 Timestamp + Reactions */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{new Date(confess.createdAt).toLocaleString()}</span>

  <div className="flex flex-col items-end gap-2">
    <button
      onClick={() => handleReport(confess._id)}
      className="relative inline-flex items-center px-3 py-1 text-xs font-semibold text-red-600 bg-red-50 border border-red-300 rounded-full shadow-sm hover:bg-red-100 hover:scale-105 transition-all duration-300 group"
    >
      🚩
      <span className="ml-1">Report</span>
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[11px] px-2 py-1 bg-black text-white rounded shadow transition-all duration-200">
        Flag this post
      </span>
    </button>
           


            <div className="flex gap-3 text-xl">
              {["like", "laugh", "sad"].map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    userReactions[confess._id] === type
                      ? handleUndoReaction(confess._id, type)
                      : !userReactions[confess._id] &&
                        handleReact(confess._id, type)
                  }
                  disabled={
                    userReactions[confess._id] &&
                    userReactions[confess._id] !== type
                  }
                  className={`relative hover:scale-110 transition-transform duration-300 ease-in-out ${
                    userReactions[confess._id] === type
                      ? "text-pink-600 animate-bounce"
                      : ""
                  }`}
                >
                
                  {/* Emoji + count */}
                  {type === "like" && "❤️"}{" "}
                  {type === "laugh" && "😂"}{" "}
                  {type === "sad" && "😢"}{" "}
                  {confess.emojiReactions?.[type] || 0}

                  {/* Tooltip */}
                  {userReactions[confess._id] &&
                    userReactions[confess._id] !== type && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                        Already reacted!
                      </span>
                    )}
                </button>
              ))}
            </div>
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
)}

    </div>
    </PageWrapper>
  );
}
  



export default ConfessionFeed;
