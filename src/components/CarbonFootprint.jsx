import React from "react";
import { useCarbonFootprint } from "../context/CarbonFootprintContext";

export default function CarbonFootprint() {
  const { footprint, coins } = useCarbonFootprint();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex justify-between items-center">
      <p className="text-green-700 font-bold">🌱 Carbon Footprint: {footprint}</p>
      <p className="text-yellow-600 font-bold">🪙 Coins: {coins}</p>
    </div>
  );
}
