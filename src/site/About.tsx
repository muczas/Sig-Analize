import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-gradient-to-b from-[#0d0f1a] via-[#1f2233] to-[#0d0f1a] text-white min-h-screen font-sans relative overflow-x-hidden">
      
      {/* Menu */}
      <div className="absolute top-5 right-5 z-50">
        <div
          className="bg-white rounded-full w-14 h-14 flex items-center justify-center cursor-pointer shadow-lg"
          onClick={toggleMenu}
        >
          <div className="flex flex-col gap-1">
            <div className="w-7 h-1 bg-[#0d0f1a] rounded"></div>
            <div className="w-7 h-1 bg-[#0d0f1a] rounded"></div>
            <div className="w-7 h-1 bg-[#0d0f1a] rounded"></div>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute top-20 right-0 w-60 bg-gradient-to-r from-purple-700 to-pink-500 rounded-2xl p-6 flex flex-col gap-4 shadow-xl z-50">
            <Link
              to="/signal"
              className="flex items-center bg-white bg-opacity-20 rounded-xl px-5 py-3 text-lg font-medium hover:bg-opacity-40 transition"
            >
              <img src="src\site\heart-rate.png" alt="Dodaj" className="w-6 h-6 mr-3" />
              Add Signal
            </Link>
            <Link
              to="/Avatar"
              className="flex items-center bg-white bg-opacity-20 rounded-xl px-5 py-3 text-lg font-medium hover:bg-opacity-40 transition"
            >
              <img src="src\site\user.png" alt="Profil" className="w-6 h-6 mr-3" />
              My Profile
            </Link>
            
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center px-6 py-20 md:px-20 gap-12">
        {/* EKG image */}
        <div className="max-w-3xl w-full flex justify-center">
          <img
            src="src\site\rozowy_wykres_ekg.jpg"
            alt="EKG visualization"
            className="rounded-3xl shadow-2xl w-full max-h-[500px] object-cover"
          />
        </div>

        {/* Text section */}
        <div className="max-w-3xl w-full text-center md:text-left">
          <h2 className="text-5xl font-bold text-purple-400 mb-6">About us</h2>
          <p className="text-lg leading-relaxed font-medium text-gray-200 mb-4">
            <strong>Sig&Analyze</strong>  is an innovative platform designed for users who want to analyze and understand ECG signals quickly and intuitively. 
            Our system uses artificial intelligence and machine learning algorithms to identify key features of the heart rhythm within seconds
          </p>
          <p className="text-lg leading-relaxed font-medium text-gray-300 mb-6">
         Whether you are a doctor, a medical student, or someone who simply cares about their health, 
         Sig&Analyze allows you to take a closer look at your heart’s activity. Additionally, we offer:
          </p>
          <ul className="list-disc list-inside text-gray-300 text-left ml-4 space-y-2">
            <li>automatic detection of abnormalities</li>
            <li>interactive ECG waveform visualizations</li>
            <li>easy use on mobile devices</li>
            <li>the ability to export results</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 pb-6">
        © 2025 Sig&Analyze — Wszelkie prawa zastrzeżone.
      </footer>
    </div>
  );
};

export default About;