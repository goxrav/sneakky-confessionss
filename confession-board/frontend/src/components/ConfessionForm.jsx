import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import Confetti from "react-confetti";
import useSound from "use-sound";
import successSound from "../assets/sounds/successsound.mp3"; // ✅ Make sure this file exists
import PageWrapper from "../components/PageWrapper";
const ConfessionForm = () => {
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [play] = useSound(successSound);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!message.trim()) {
    toast.error("Please enter a message!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/confess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (response.ok) {
      play(); // ✅ only play sound if API call succeeded
      toast.success("Confession submitted successfully! 🎉");
      setShowConfetti(true);
      setMessage("");

      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      toast.error(data.error || "Failed to submit confession.");
    }
  } catch (error) {
    console.error("❌ Error submitting confession:", error);
    toast.error("Server error. Please try again later.");
  }
};


  return (
    <PageWrapper>
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Toaster position="top-center" richColors />

      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {/* Floating Emojis */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {[...Array(50)].map((_, index) => {
          const emojis = ["💌", "😳", "💀", "💬", "❤️", "😂"];
          const emoji = emojis[Math.floor(Math.random() * emojis.length)];
          const leftPosition = Math.random() * 100;
          const size = Math.floor(Math.random() * 12) + 16;
          return (
            <motion.div
              key={index}
              initial={{ y: "100vh", x: `${leftPosition}vw`, opacity: 0 }}
              animate={{ y: "-10vh", opacity: 1 }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 6,
              }}
              className="absolute"
              style={{ fontSize: `${size}px`, left: `${leftPosition}vw` }}
            >
              {emoji}
            </motion.div>
          );
        })}
      </div>

      {/* Confession Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 15 }}
        className="w-full max-w-lg p-2 rounded-2xl bg-white dark:bg-gray-900 shadow-3xl space-y-3 backdrop-blur-md border-4 border-pink-300 dark:border-purple-600 z-10"
      >
        <motion.h2
          className="text-2xl font-extrabold text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-700 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Drop Your 🔥 Confession
        </motion.h2>

        <textarea
          rows="3"
          placeholder="Spill the tea... anonymously 🍵"
          className="w-full p-4 rounded-xl text-lg bg-gray-100 dark:bg-gray-800 border-none shadow-xl outline-none resize-none transition-transform duration-500 transform hover:rotate-1 hover:scale-[1.02] focus:rotate-2 focus:scale-[1.04] focus:ring-4 focus:ring-pink-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-3 rounded-full text-xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 hover:from-yellow-500 hover:to-pink-500 text-white shadow-lg transform hover:scale-105 transition duration-300"
        >
          🚀 Confess Now
        </button>
      </motion.form>
    </div>
    </PageWrapper>
  );
};

export default ConfessionForm;
