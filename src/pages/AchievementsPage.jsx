import React, { useState, useEffect } from "react";
import CarbonFootprint from "../components/CarbonFootprint";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);

  // Example achievements – later we can link them to real game progress
  useEffect(() => {
    const unlocked = [
      {
        id: 1,
        title: "🌱 First Step",
        description: "Completed Level 1 in Primary",
        unlocked: true,
      },
      {
        id: 2,
        title: "♻ Eco Hero",
        description: "Uploaded your first real-world quest",
        unlocked: false,
      },
      {
        id: 3,
        title: "🌍 Green Champion",
        description: "Reached 100 Carbon Footprint points",
        unlocked: false,
      },
      {
        id: 4,
        title: "📚 Scholar of Nature",
        description: "Finished all three levels in Primary",
        unlocked: false,
      },
    ];
    setAchievements(unlocked);
  }, []);

  return (
    <div className="p-6">
      <CarbonFootprint />
      <h1 className="text-2xl font-bold text-center mb-6">🏆 Your Achievements</h1>
      <p className="text-center text-gray-600 mb-6">
        Unlock badges and milestones as you learn and take eco-friendly actions!
      </p>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={`p-6 rounded-lg shadow-md text-center ${
              a.unlocked
                ? "bg-green-100 border border-green-500"
                : "bg-gray-100 border border-gray-300 opacity-60"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{a.title}</h2>
            <p className="text-gray-700">{a.description}</p>
            {a.unlocked ? (
              <p className="mt-3 text-green-600 font-bold">✅ Unlocked!</p>
            ) : (
              <p className="mt-3 text-gray-500">🔒 Locked</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
