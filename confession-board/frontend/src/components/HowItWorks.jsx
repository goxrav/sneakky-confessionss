import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: "📝",
    title: "Write your secret",
    description: "Confess freely. No names, no traces.",
  },
  {
    icon: "🛡️",
    title: "We keep you anonymous",
    description: "Your identity is never stored or shared.",
  },
  {
    icon: "💬",
    title: "Let others react (or not)",
    description: "People can read and react to your confessions.",
  },
];

const HowItWorks = () => {
  return (
    <section className="px-6 py-16 bg-gradient-to-br from-pink-50 via-yellow-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <h2 className="text-4xl font-bold text-center text-pink-600 dark:text-pink-300 mb-12">
        How It Works 🔍
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 text-center border border-white/20 transition-all duration-200"
          >
            <div className="text-5xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
