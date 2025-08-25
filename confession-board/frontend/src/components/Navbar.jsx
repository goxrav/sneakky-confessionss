import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css"; // Ensure CSS is imported

function Navbar() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-blue-600 dark:bg-gray-800 dark:text-yellow-400"
      : "bg-blue-600 text-white dark:bg-gray-700 dark:text-white";

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 py-3 shadow-md dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-3xl animate-bounce">💬</span>
          <span className="typewriter-text font-extrabold text-2xl sm:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-orange-300 to-yellow-400">
            sNeAkkY CoNFesSIOns
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {["/","feed"].map((path, index) => {
            const label = ["Home","Feed"][index];
            const emoji = ["🏠","🎲"][index];
            return (
              <Link
                key={path}
                to={path}
                className={`group relative px-2 py-2 font-semibold rounded-full transition-all duration-300 
        bg-gradient-to-br from-yellow-00 via-blue-500 to-blue-600 
        hover:from-pink-600 hover:to-yellow-400
        text-white shadow-lg hover:scale-105 active:scale-95
        dark:from-pink-600 dark:via-pink-600 dark:to-pink-600 dark:hover:via-pink-600
         ${isActive(path)}`
                }
              >
              <span className="relative z-10 flex items-center gap-1">
                {label}
                 <span className="emoji-badge text-lg animate-wiggle">{emoji}</span>
                </span>
              <span className="absolute inset-0 rounded full blur-md opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg bg-gradient-to-br from-pink-400 via-purple-600 to-yellow-400 dark:from-pink-800 dark:to-yellow-600"></span> 
              </Link>
            );
          })}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 px-3 py-2 bg-white dark:bg-black dark:text-pink-300 text-black font-semibold rounded-full shadow-md hover:scale-110 transition-transform duration-300"
            title="Toggle Dark Mode"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
