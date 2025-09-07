import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const TodaysProgress = () => {
  const [habits, setHabits] = useState([
    { id: 1, text: "Use reusable water bottle", completed: false },
    { id: 2, text: "Switch off lights when leaving room", completed: false },
    { id: 3, text: "Use public transport", completed: false },
    { id: 4, text: "Recycle plastic waste", completed: false },
    { id: 5, text: "Plant a tree", completed: false },
  ]);

  // toggle habit completion
  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  // count completed habits
  const completedCount = habits.filter((h) => h.completed).length;
  const percentage = Math.round((completedCount / habits.length) * 100);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Today's Progress</h2>
        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
          {percentage}% Complete
        </span>
      </div>

      <ul className="space-y-3">
        {habits.map((habit) => (
          <li
            key={habit.id}
            onClick={() => toggleHabit(habit.id)}
            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition ${
              habit.completed ? "bg-green-50" : "hover:bg-gray-50"
            }`}
          >
            {habit.completed ? (
              <CheckCircle size={20} className="text-green-600" />
            ) : (
              <XCircle size={20} className="text-gray-400" />
            )}

            <span
              className={`${
                habit.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {habit.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Completed count */}
      <div className="mt-4 text-sm text-gray-600">
        {completedCount} of {habits.length} completed
      </div>
    </div>
  );
};

export default TodaysProgress;
