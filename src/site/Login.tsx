import React from "react";

export default function LoginForm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex flex-col items-center justify-center">
      {/* Logo & Title */}
      <div className="absolute top-6 left-6 flex items-center space-x-2">
        <div className="text-pink-500 text-3xl">❤️</div>
        <h1 className="text-white text-3xl font-bold">
          Sig<span className="text-purple-400">&Analyze</span>
        </h1>
      </div>

      {/* Card */}
      <div className="bg-gray-300/30 backdrop-blur-sm p-8 rounded-3xl shadow-lg w-full max-w-md text-white">
        <div className="flex justify-center mb-6">
          <div className="bg-black rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              width="48"
              height="48"
            >
              <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
        </div>

        <form className="space-y-6">
          <div className="flex items-center bg-white text-black rounded-full px-4 py-2">
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
            <input
              type="email"
              placeholder="Email ID"
              className="bg-transparent focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center bg-white text-black rounded-full px-4 py-2">
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 17c1.1 0 2-.9 2-2v-2h-4v2c0 1.1.9 2 2 2zm6-8h-1V7c0-2.8-2.2-5-5-5S7 4.2 7 7v2H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2zM9 7c0-1.7 1.3-3 3-3s3 1.3 3 3v2H9V7z" />
            </svg>
            <input
              type="password"
              placeholder="Hasło"
              className="bg-transparent focus:outline-none w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 w-full py-2 rounded-full text-white font-bold text-lg"
          >
            Zaloguj
          </button>
        </form>
      </div>
    </div>
  );
}
