import React, { useState } from "react";
import CarbonFootprint from "../components/CarbonFootprint";

export default function RealWorldQuestPage() {
  const [quests, setQuests] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!imagePreview || !description.trim()) return;

    const newQuest = {
      id: Date.now(),
      description,
      image: imagePreview,
    };

    setQuests([newQuest, ...quests]);
    setImagePreview(null);
    setDescription("");
  };

  return (
    <div className="p-6">
      <CarbonFootprint />
      <h1 className="text-2xl font-bold text-center mb-6">🌱 Real-World Quests</h1>
      <p className="text-center text-gray-600 mb-4">
        Upload proof of your eco-actions (like planting, recycling, or cleaning) and inspire others!
      </p>

      {/* Upload Form */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6 max-w-lg mx-auto">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your eco-action..."
          className="w-full p-2 border rounded-md mb-3"
          rows="2"
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-3"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-md mb-3"
          />
        )}

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Submit Quest
        </button>
      </div>

      {/* Quest Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quests.length === 0 ? (
          <p className="text-gray-500 text-center col-span-2">No quests yet. Be the first hero! 🌍</p>
        ) : (
          quests.map((quest) => (
            <div
              key={quest.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={quest.image}
                alt="Quest proof"
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <p>{quest.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
