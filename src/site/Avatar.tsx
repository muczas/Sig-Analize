import React, { useState } from "react";

export default function Avatar() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: ""
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center md:items-start md:justify-between space-y-6 md:space-y-0">
        {/* Sidebar Profile */}
        <div className="text-white flex flex-col items-center space-y-4">
          <div className="text-pink-500 text-3xl absolute top-6 left-6 flex items-center">
            <span className="mr-2">❤️</span>
            <h1 className="text-white text-3xl font-bold">
              Sig<span className="text-purple-400">&Analyze</span>
            </h1>
          </div>

          <div className="mt-12 w-48 h-48 bg-white rounded-full flex items-center justify-center text-black text-5xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-24 h-24"
            >
              <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
          <div className="text-2xl font-bold">
            {user.firstName || user.lastName ? `${user.firstName} ${user.lastName}` : ""}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white/20 backdrop-blur-sm text-white p-6 rounded-3xl space-y-3 w-full max-w-md">
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
      <div className="absolute bottom-10 flex space-x-4">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold">
          Wyloguj
        </button>
        <button className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-2 rounded-full font-bold">
          Wróć do analizy
        </button>
      </div>
    </div>
  );
}

