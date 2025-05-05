import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-[#0d0f1a] text-white min-h-screen font-sans">
      <header className="flex items-center p-5">
      <div className="text-pink-500 text-3xl">❤️</div>
        <h1 className="text-2xl font-bold">Sig&Analize</h1>
      </header>

      <div className="absolute top-5 right-5">
        <div
          className="bg-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
          onClick={toggleMenu}
        >
          <div className="flex flex-col gap-1">
            <div className="w-6 h-1 bg-[#0d0f1a]"></div>
            <div className="w-6 h-1 bg-[#0d0f1a]"></div>
            <div className="w-6 h-1 bg-[#0d0f1a]"></div>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute top-16 right-0 bg-gradient-to-r from-purple-700 to-pink-500 rounded-2xl p-5 flex flex-col gap-3">
            <Link to="/signal" className="flex items-center bg-white bg-opacity-20 rounded-xl px-4 py-2 hover:bg-opacity-40">
              <img src="plus_icon.png" alt="Dodaj" className="w-6 mr-2" />
              Dodaj sygnał
            </Link>
            <Link to="/profile" className="flex items-center bg-white bg-opacity-20 rounded-xl px-4 py-2 hover:bg-opacity-40">
              <img src="profile_icon.png" alt="Profil" className="w-6 mr-2" />
              Mój profil
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-wrap p-8 gap-8">
        <div className="max-w-lg">
          <img src="/mnt/data/02f95310-16c6-4ac4-affd-8b2e3e968565.png" alt="EKG" className="rounded-2xl" />
        </div>
        <div className="max-w-xl">
          <h2 className="text-purple-400 text-5xl font-bold mb-4">O nas</h2>
          <p className="text-lg leading-relaxed font-semibold">
            Nasza aplikacja powstała z myślą o precyzyjnej i łatwo dostępnej analizie sygnałów EKG.
            Dzięki zaawansowanym algorytmom przetwarzania danych umożliwiamy użytkownikom szybkie wyodrębnienie kluczowych parametrów pracy serca.
            Niezależnie od tego, czy jesteś specjalistą, studentem czy osobą dbającą o swoje zdrowie – nasza aplikacja pomoże Ci lepiej zrozumieć rytm Twojego serca.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
