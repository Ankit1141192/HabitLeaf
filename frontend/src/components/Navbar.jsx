import { NavLink } from "react-router-dom";
import leaf from "../assets/leaf.svg";

const Navbar = () => {
  return (
    <nav className="py-4 px-8 bg-white shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">

        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <img src={leaf} alt="logo" className="w-10 h-10 text-gray-900 " />
          <div>
            <h1 className="text-gray-900 font-bold text-xl">HabbitLeaf</h1>
            <p className="text-green-500 text-sm -mt-1">
              Sustainable Habits Tracker
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `hover:text-green-600 ${
                isActive ? "text-green-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/myhabit"
            className={({ isActive }) =>
              `hover:text-green-600 ${
                isActive ? "text-green-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            My Habits
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              `hover:text-green-600 ${
                isActive ? "text-green-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            Community
          </NavLink>
          <NavLink
            to="/achievements"
            className={({ isActive }) =>
              `hover:text-green-600 ${
                isActive ? "text-green-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            Achievements
          </NavLink>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button className="bg-green-100 text-green-700 px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-green-200 transition">
            <span>🔥</span>
            <span>7 day streak</span>
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
