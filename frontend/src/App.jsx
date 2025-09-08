import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MyHabbit from "./pages/MyHabbit";
import Community from "./pages/Community";
import Achievements from "./pages/Achievements";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <div className="p-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/myhabit"
            element={isAuthenticated ? <MyHabbit /> : <Navigate to="/login" />}
          />
          <Route
            path="/community"
            element={isAuthenticated ? <Community /> : <Navigate to="/login" />}
          />
          <Route
            path="/achievements"
            element={
              isAuthenticated ? <Achievements /> : <Navigate to="/login" />
            }
          />
          <Route
            path="*"
            element={
              <h1 className="text-3xl text-center mt-20">404: Page Not Found</h1>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
