import React from "react";
import Chart from "../components/Chart";

const achievements = [
  {
    name: "7-Day Streak",
    icon: "🔥",
    achieved: true,
    bg: "bg-orange-50 border-orange-200",
    text: "text-orange-400",
  },
  {
    name: "Water Saver",
    icon: "💧",
    achieved: true,
    bg: "bg-blue-50 border-blue-200",
    text: "text-blue-400",
  },
  {
    name: "Energy Efficient",
    icon: "💡",
    achieved: true,
    bg: "bg-yellow-50 border-yellow-200",
    text: "text-yellow-400",
    highlight: "border-2 border-yellow-300",
  },
  {
    name: "Plastic-Free Week",
    icon: "🍃",
    achieved: false,
    bg: "bg-gray-100 border-gray-200 opacity-60",
    text: "text-gray-400",
  },
  {
    name: "Green Transport",
    icon: "🚌",
    achieved: false,
    bg: "bg-gray-100 border-gray-200 opacity-60",
    text: "text-gray-400",
  },
  {
    name: "Eco Champion",
    icon: "🏆",
    achieved: false,
    bg: "bg-gray-100 border-gray-200 opacity-60",
    text: "text-gray-400",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-green-50 p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          EcoGoals{" "}
          <span className="text-green-400 font-normal text-lg">
            Sustainable Habits Tracker
          </span>
        </h1>
        <div className="bg-green-100 text-green-700 py-1 px-4 rounded-full text-sm font-semibold">
          7 day streak
        </div>
      </div>

      {/* Stats and Greeting */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Welcome back, Sarah! <span role="img" aria-label="plant">🌱</span>
        </h2>
        <p className="text-lg text-gray-500 mb-6">
          Here's your eco-friendly progress overview
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: "🌱", value: "7", label: "Current Streak", color: "text-green-400" },
            { icon: "✅", value: "28", label: "Habits Completed", color: "text-blue-400" },
            { icon: "🏆", value: "3", label: "Badges Earned", color: "text-yellow-400" },
            { icon: "🍃", value: "2.1", label: "CO₂ Saved (kg)", color: "text-green-500" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className={`text-2xl mb-2 ${stat.color}`}>{stat.icon}</span>
              <span className="text-2xl font-semibold">{stat.value}</span>
              <span className="text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
        <Chart/>
      {/* Achievements */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Achievements</h2>
          <a className="text-green-600 cursor-pointer hover:underline font-medium">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {achievements.map((a) => (
            <div
              key={a.name}
              className={`border rounded-lg p-4 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer ${a.bg} ${a.text} ${a.highlight || ""}`}
            >
              <span className="text-3xl mb-2">{a.icon}</span>
              <span className="font-bold mb-1 text-gray-700">{a.name}</span>
              {a.achieved ? (
                <span className="text-green-500 font-bold">✓</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg p-4 font-semibold flex flex-col transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer">
          <span className="mb-1">✓ Track Today's Habits</span>
          <span className="font-normal text-green-100">
            Check off your daily eco-friendly actions
          </span>
        </div>
        <div className="bg-blue-50 text-blue-800 rounded-lg p-4 font-semibold flex flex-col transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer">
          <span className="mb-1">👥 Join Community</span>
          <span className="font-normal text-blue-400">
            Share progress and get inspired by others
          </span>
        </div>
        <div className="bg-yellow-50 text-yellow-800 rounded-lg p-4 font-semibold flex flex-col transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer">
          <span className="mb-1">🔗 Share Progress</span>
          <span className="font-normal text-yellow-400">
            Inspire friends on social media
          </span>
        </div>
      </div>

      {/* Tip Box */}
      <div className="bg-green-100 border border-green-300 text-green-800 rounded-lg p-4 flex items-start">
        <span className="text-2xl mr-3">💡</span>
        <div>
          <b>Tip</b>
          <div>Focus on improving your transport habits to reach the next level!</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
