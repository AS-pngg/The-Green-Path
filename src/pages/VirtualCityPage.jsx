
import React from "react";
import VirtualCity from "../components/VirtualCity";

export default function VirtualCityPage() {
  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        🌱 Virtual City
      </h1>
      <p className="text-center text-gray-700 mb-6">
        Build your eco-friendly city by placing plants, animals, and green
        infrastructure. Buy items in the shop and learn about endangered
        species while earning coins!
      </p>
      <VirtualCity gridSize={5} />
    </div>
  );
}
