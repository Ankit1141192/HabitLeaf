import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/herosection.jpg";

export default function Login({ setIsAuthenticated }) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        // ✅ Store login info (you can store token instead of true if backend returns it)
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);

        setMessage("🎉 Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1200); // redirect after 1.2s
      } else {
        setMessage(result.message || "❌ Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-m"></div>

      <div className="relative z-10 max-w-md w-full bg-white/80 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <span className="inline-block bg-green-100 text-green-600 font-semibold px-3 py-1 rounded-full mb-3">
            HabitLeaf
          </span>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">
            Get motivated — small green steps every day 🌱
          </p>
        </div>

        {message && (
          <div
            className={`mb-4 text-center font-medium ${
              message.includes("🎉")
                ? "text-green-600"
                : message.includes("❌")
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow-lg hover:scale-[1.01] transition"
          >
            Log in
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <a href="/signup" className="text-gray-800 font-medium hover:underline">
            Don't have an account? Sign up
          </a>
          <div className="flex justify-center gap-4 mt-3">
            <a href="/forgot-password" className="text-gray-500 hover:text-green-600">
              Forgot password
            </a>
            <a href="/help" className="text-gray-500 hover:text-green-600">
              Need help?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
