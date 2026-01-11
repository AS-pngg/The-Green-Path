import React from "react";
import { Link } from "react-router-dom";

export default function Level1Page() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
        🌱 Level 1: Eco-Friendly Habits
      </h1>

      <p className="text-center text-gray-600 mb-6">
        Learn the basics of eco-friendly habits in your daily life like saving water,
        turning off lights, and recycling.
      </p>
       {/* Embed the HTML/CSS/JS game */}
      <div className="flex justify-center mb-6">
        <iframe
        src="/games/bingo/index.html"
        title="Lets Play"
        className="w-full max-w-6xl h-[900px] border-2 border-green-300 rounded-xl shadow-lg"
      ></iframe>
      </div>

      <Link
        to="/primary"
        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
      >
        ⬅ Back to Primary
      </Link>
    </div>
  );
}
