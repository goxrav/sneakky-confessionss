import React from "react";


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden mt-15 text-white dark:text-pink-200">
      {/* 🔁 Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-yellow-400 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 bg-[length:300%_300%] animate-gradient z-0"></div>

      {/* ✨ Floating Emojis */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {["💬", "🔥", "🌈", "🕵️‍♀️", "🤐"].map((emoji, index) => (
          <span
            key={index}
            className="absolute text-2xl opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 2}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* 🔗 Content */}
      <div className="relative z-10 container mx-auto p-6 text-center space-y-4">
        <h3 className="text-2xl font-bold tracking-wide">
          💬 sNeAkkY CoNFesSIOns
        </h3>

        <p className="text-sm md:text-base">
          A place to speak your mind anonymously and honestly. Be real, be raw. 🔥
        </p>

        {/* 👨‍💻 Developer Links */}
        <div className="flex justify-center gap-6 text-sm font-medium">
          <a
            href="https://github.com/goxrav"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            💻 GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/gauravmehan5046"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            🔗 LinkedIn
          </a>
          <a
            href="mailto:gauravjh0827@gmail.com"
            className="hover:underline"
          >
            📩 Contact
          </a>
        </div>

        <p className="text-xs opacity-80">
          © {year} sNeAkkY CoNFesSIOns. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
