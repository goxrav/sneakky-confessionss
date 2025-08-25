import React from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/outline";
import PageWrapper from "../components/PageWrapper";
const LearnMore = () => {
  return (
    <PageWrapper>
    <motion.section
      id="learnmore"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-16 px-6 py-12 rounded-3xl shadow-2xl bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 max-w-5xl mx-auto text-center"
    >
      <div className="flex justify-center mb-4">
        <SparklesIcon className="h-10 w-10 text-pink-500 dark:text-pink-300 animate-bounce" />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        Why Stay Anonymous?
      </h2>

      <p className="mt-4 text-gray-700 dark:text-gray-300 text-base leading-relaxed max-w-2xl mx-auto">
        At <span className="text-pink-500 font-semibold">sNeAkkY CoNFesSIOns</span>, we believe in freedom of expression — without judgment. Whether it's a silly moment, a deep secret, or a wild thought, this is your safe space to confess, vent, and vibe ✨
      </p>
    </motion.section>
    </PageWrapper>
  );
};

export default LearnMore;