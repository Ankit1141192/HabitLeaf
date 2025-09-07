import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MyHabbit from "./pages/MyHabbit";
import Community from "./pages/Community";
import Achievements from "./pages/Achievements";
import HeroSection from "./components/HeroSection";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Home/>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myhabit" element={<MyHabbit />} />
          <Route path="/community" element={<Community />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
