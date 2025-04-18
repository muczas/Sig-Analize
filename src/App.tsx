import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./site/About";
import Avatar from "./site/Avatar";
import Login from "./site/Login";
import Registry from "./site/Registry";
import Signal from "./site/Signal";
import Welcome from "./site/Welcome";
import Nav from "./Nav";

function App() {  
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signal" element={<Signal />} />
        <Route path="/about" element={<About />} /> {/* poprawka "abaut" → "about" */}
      </Routes>
    </>
  );
}

export default App;
