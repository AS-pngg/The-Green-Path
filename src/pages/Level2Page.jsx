import React from "react";
import { Link } from "react-router-dom";

export default function Level2Page() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
        🔄 Level 2: Recycling & Energy Saving
      </h1>

      <p className="text-center text-gray-600 mb-6">
        Recycling is the process of collecting used materials like paper, plastic, and glass, processing them into new raw materials, and then creating new products. This practice reduces waste sent to landfills, conserves natural resources, and lowers energy consumption and pollution. Key materials that can be recycled include paper, cardboard, glass, aluminum, and certain plastics, with processes varying based on the material type.  
      </p>

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto mb-6">
        <h2 className="text-xl font-semibold mb-4">Mini Challenge</h2>
        <p className="mb-4">Which of these can be recycled?</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Plastic bottles ✅</li>
          <li>Food scraps</li>
          <li>Broken toys with electronics</li>
        </ul>
      </div>
       {/* Embed the HTML/CSS/JS game */}
      <div className="flex justify-center mb-6">
        <iframe
        src="/games/sorting/index.html"
        title="Lets Play"
        className="w-full max-w-6xl h-[700px] border-2 border-green-300 rounded-xl shadow-lg"
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
