import React from "react";
import { Link } from "react-router-dom";
import serce from "./serce.png";

function Welcome() {
  return (
    <div className="h-[100vh] bg-gradient-to-r from-black to-indigo-900 text-white px-4 sm:px-8 lg:px-16 py-6 flex flex-col">
      
      
      {/* Główna zawartość */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between flex-grow gap-8 lg:gap-16 max-w-7xl mx-auto w-full overflow-hidden">
        {/* LEWA KOLUMNA: TEKST + PRZYCISKI */}
        <div className="flex-1 w-full text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold font-mono leading-tight mb-6">
            Your <span className="text-purple-400">Heart</span><br />
            Your <span className="text-purple-400">signal!</span>
          </h2>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link
              to="/Login"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-full transition w-full sm:w-auto text-center"
            >
              Log in
            </Link>
            <Link
              to="/registry"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-full transition w-full sm:w-auto text-center"
            >
              Register
            </Link>
          </div>
        </div>

        {/* PRAWA KOLUMNA: OBRAZEK */}
        <div className="relative flex-1 w-full max-w-md md:max-w-lg lg:max-w-2xl">
          <div className="absolute inset-0 rounded-3xl blur-3xl opacity-70 bg-purple-500 scale-105 z-0" />
          <div className="relative rounded-3xl overflow-hidden border-4 border-transparent hover:border-pink-500 transition shadow-[0_0_60px_15px_rgba(168,85,247,0.5)] z-10">
            <img
              src={serce}
              alt="Model serca"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
