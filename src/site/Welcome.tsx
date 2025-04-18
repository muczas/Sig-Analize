import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Słuchaj głosu swojego serca!</h1>
        <p className="text-lg">Twoje zdrowie w Twoich rękach.</p>
      </header>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Logowanie
        </Link>
        <Link
          to="/registry"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Rejestracja
        </Link>
      </div>

      <div className="mt-8">
        <img
          src="serce.png" 
          alt="Heart Illustration"
          className="w-64 h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default Welcome;