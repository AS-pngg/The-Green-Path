import React from "react";
import { Link } from "react-router-dom";
import CarbonFootprint from "../components/CarbonFootprint";

export default function PrimaryPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        🎮 Welcome to Your Eco Journey
      </h1>

      {/* ✅ Carbon Footprint at the top */}
      <div className="mb-8">
        <CarbonFootprint />
      </div>

      {/* Levels Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto mb-10">
        {/* Level 1 */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:scale-105 transform transition">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Level 1</h2>
          <p className="text-gray-600 mb-4 text-center">
            Introduction to eco-friendly habits and daily actions.
          </p>
          <Link
            to="/student/primary/level1"
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Start Level 1
          </Link>
        </div>

        {/* Level 2 */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:scale-105 transform transition">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Level 2</h2>
          <p className="text-gray-600 mb-4 text-center">
            Explore recycling, energy saving, and protecting nature.
          </p>
          <Link
            to="/student/primary/level2"
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Start Level 2
          </Link>
        </div>

        {/* Level 3 */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:scale-105 transform transition">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Level 3</h2>
          <p className="text-gray-600 mb-4 text-center">
            Apply your knowledge with fun eco-friendly challenges.
          </p>
          <Link
            to="/student/primary/level3"
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Start Level 3
          </Link>
        </div>
      </div>

      {/* ✅ Back Button at the bottom */}
      <div className="text-center">
        <Link
          to="/student"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}
