import React, { useState } from "react";
import CarbonFootprint from "../components/CarbonFootprint";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim() === "") return;
    setPosts([{ text: newPost, id: Date.now() }, ...posts]);
    setNewPost("");
  };

  return (
    <div className="p-6">
      <CarbonFootprint />
      <h1 className="text-2xl font-bold text-center mb-6">🌍 Community Forum</h1>

      {/* Post Input */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your eco-friendly ideas..."
          className="w-full p-2 border rounded-md"
          rows="3"
        ></textarea>
        <button
          onClick={handlePost}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Post
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts yet. Be the first! 🌱</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow rounded-lg p-4 border-l-4 border-green-600"
            >
              <p>{post.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
