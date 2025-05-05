import React from "react";
import { Link } from "react-router-dom";
import logo from './logo.png'; 
import serceImage from "./serce.png"; 

function Welcome() {
  return (
    <div className="bg-gradient-to-r from-black to-indigo-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      {/* Logo i nazwa */}
      <div className="flex items-center gap-2 mb-8">
      <div className="text-pink-500 text-3xl">❤️</div>
        <h1 className="text-white text-3xl font-bold">
          Sig<span className="text-purple-400">&Analyze</span>
        </h1>
      </div>

      {/* Nagłówek */}
      <h1 className="text-white text-3xl font-bold">
        Słuchaj <span  className="text-purple-400">głosu</span>  <br /> swojego <span  className="text-purple-400">serca!</span>
      </h1>

      {/* Przyciski */}
      <div className="flex gap-6 mb-8">
        <Link
          to="/Login"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-full transition"
        >
          Logowanie
        </Link>
        <Link
          to="/registry"
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-full transition"
        >
          Rejestracja
        </Link>
      </div>

      {/* Obrazek */}
      <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-transparent hover:border-pink-500 transition">
        <img
          src={serceImage}
          alt="Model serca"
          className="w-80 h-auto object-cover"
        />
      </div>
    </div>
  );
}

export default Welcome;
