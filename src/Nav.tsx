import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const hiddenPaths = ["/", "/Welcome", "/Login", "/registry", "/About", "/Avatar", "/signal"];
  const shouldHideNav = hiddenPaths.includes(location.pathname);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Logo - zawsze widoczne */}
      <div className="text-5xl font-extrabold">
        <span className="text-red-400">❤</span> Sig
        <span className="text-purple-400">&Analyze</span>
      </div>

      {/* Przyciski - tylko poza stroną Welcome/Login/Rejestracja */}
      {!shouldHideNav && (
        <div className="space-x-4">
          <Link to="/Welcome" className="bg-gray-200 text-black px-4 py-2 rounded">Welcome</Link>
          <Link to="/Avatar" className="bg-gray-200 text-black px-4 py-2 rounded">Avatar</Link>
          <Link to="/Signal" className="bg-gray-200 text-black px-4 py-2 rounded">Signal</Link>
        </div>
      )}
    </nav>
  );
}
