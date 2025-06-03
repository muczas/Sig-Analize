import React from "react";
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between flex-wrap p-4 bg-gray-800 text-white w-full">
      
      {/* Logo po lewej, część układu flex */}
      <div className="flex items-center gap-2 mb-4 sm:mb-0">
        <div className="text-pink-500 text-3xl sm:text-4xl md:text-5xl">❤️</div>
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black font-mono">
          Sig<span className="text-purple-400 font-black">&Analyze</span>
        </h1>
      </div>

      {/* Linki po prawej, zawijają się na małych ekranach */}
      <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4">
        {[
          { to: "/", label: "Welcome" },
          { to: "/registry", label: "Register" },
          { to: "/avatar", label: "Avatar" },
          { to: "/login", label: "Login" },
          { to: "/signal", label: "Signal" },
        ].map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className="text-sm sm:text-base md:text-lg text-black dark:text-white bg-gray-300 dark:bg-gray-700 px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Nav;
