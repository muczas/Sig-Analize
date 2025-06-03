import React, { useState } from "react";

export default function Avatar() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: ""
  });

  // Funkcje obsługujące zdarzenia
  const handleLogout = () => {
    alert("Zostałeś wylogowany!");
    // Tutaj możesz dodać logikę wylogowania
  };

  const handleReturnToAnalysis = () => {
    alert("Powrót do analizy!");
    // Tutaj możesz dodać logikę przekierowania lub innej akcji
  };

  return (
<div className="h-[89vh] bg-gradient-to-r from-black to-indigo-900 flex flex-col items-center justify-center ">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start lg:justify-between space-y-8 lg:space-y-0 px-4">
        {/* Sidebar Profile */}
        <div className="text-white flex flex-col items-center">
          <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center text-black text-5xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-20 h-20"
            >
              <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
          <div className="text-lg lg:text-2xl font-bold text-center">
            {user.firstName || user.lastName ? `${user.firstName} ${user.lastName}` : ""}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white/20 backdrop-blur-sm text-white p-6 rounded-3xl space-y-3 w-full max-w-lg">
          <div>
            <strong>Imię:</strong> {user.firstName}
          </div>
          <div>
            <strong>Nazwisko:</strong> {user.lastName}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Hasło:</strong> {user.password}
          </div>
          <div>
            <strong>Płeć:</strong> {user.gender}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="absolute bottom-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold w-full sm:w-auto"
        >
          Wyloguj
        </button>
        <button
          onClick={handleReturnToAnalysis}
          className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-2 rounded-full font-bold w-full sm:w-auto"
        >
          Wróć do analizy
        </button>
      </div>
    </div>
  );
}
