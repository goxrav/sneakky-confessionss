import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import {  FaEye,} from 'react-icons/fa';
import PageWrapper from "../components/PageWrapper";
// import {EyeSlashIcon} from "@heroicons/react/24/outline"
const Herosection=() => {



    return(
        <PageWrapper>
         
    <section className="relative overflow-hidden bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 dark:from-gray-800 dark:via-gray-900 dark:to-black py-20 px-4 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-400 to-yellow-500 animate-pulse">
            sNeAkkY CoNFesSIOns 
          </h1>
          <p className="mt-4 text-lg text-gray-800 dark:text-gray-300 max-w-xl">
            Confess your secrets anonymously. No judgment. Just vibes. 💌
          </p>
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            
              <Link to="/confess" className="px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-pink-500 to-yellow-400 text-white shadow-lg hover:scale-105 transition transform">
            
              Confess Now 🚀
            </Link>
            <Link to="/learnmore" className="px-6 py-3 rounded-full font-semibold border border-pink-400 text-pink-600 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-900 hover:scale-105 transition"
            >
              Learn More 👀
            </Link>
          </div>
        </motion.div>

        {/* Right Image or Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <FaEye className="text-8xl mb-4 text-yellow-500 dark:text-pink-300" />
 {/* <EyeSlashIcon className="w-14 h-14 text-pink-600 dark:text-pink-300 mb-4" /> */}
        </motion.div>
      </div>
    </section>
    </PageWrapper>
  );
};

export default Herosection;