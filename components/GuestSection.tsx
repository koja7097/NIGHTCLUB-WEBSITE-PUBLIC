"use client";

import React, { useState, useEffect } from "react";
import { saveToStorage, loadFromStorage } from "@/lib/storage";

type GuestPost = {
  id: string;
  name: string;
  text: string;
  mood?: "🔥" | "😍" | "😐";
  createdAt: string;
  approved: boolean;
};

const KEY = "nightcrew_guestwall_v1";

export default function GuestSection() {
  const [posts, setPosts] = useState<GuestPost[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [mood, setMood] = useState<GuestPost["mood"]>("🔥");
  const [hydrated, setHydrated] = useState(false);

  //Loads from localStorage only when window exists
  useEffect(() => {
    if (typeof window !== 'undefined') {
    const saved = loadFromStorage<GuestPost[]>(KEY, []);
    setPosts(saved);
    setHydrated(true);
    }
  }, []);
// Saves to localStorage whenever Data changes (after hydration)
  useEffect(() => {
    if (hydrated) {
    saveToStorage(KEY, posts);
    }
  }, [posts, hydrated]);

  const addPost = () => {
    if (!name || !text) return;
    const newPost: GuestPost = {
      id: crypto.randomUUID(),
      name,
      text,
      mood,
      createdAt: new Date().toISOString(),
      approved: false,
    };
    setPosts([newPost, ...posts]);
    setName("");
    setText("");
  };

  const approve = (id: string) =>
    setPosts(posts.map((p) => (p.id === id ? { ...p, approved: true } : p)));

  const remove = (id: string) => setPosts(posts.filter((p) => p.id !== id));

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold">Guest Wall (Feedback)</h2>

      {/* Form */}
      <div className="space-y-3">
        <input
          placeholder="Your name"
          className="w-full p-2 bg-gray-800 rounded border border-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Share your night..."
          className="w-full p-2 bg-gray-800 rounded border border-gray-700"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex items-center gap-3">
          <label>Mood:</label>
          <select
            className="bg-gray-800 border border-gray-700 rounded p-1"
            value={mood}
            onChange={(e) => setMood(e.target.value as GuestPost["mood"])}
          >
            <option value="🔥">🔥 Fire</option>
            <option value="😍">😍 Love</option>
            <option value="😐">😐 Meh</option>
          </select>
          <button
            onClick={addPost}
            className="bg-pink-600 px-4 py-2 rounded hover:bg-pink-700"
          >
            Post
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.length === 0 && (
          <div className="text-gray-400">No messages yet. Be the first!</div>
        )}
        {posts.map((p) => (
          <div
            key={p.id}
            className="bg-gray-800 p-3 rounded border border-gray-700 flex flex-col gap-1"
          >
            <div className="flex justify-between">
              <span className="font-medium">{p.name}</span>
              <span className="text-sm text-gray-400">
                {new Date(p.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p>{p.text}</p>
            <div className="flex justify-between items-center text-sm mt-1">
              <span>{p.mood}</span>
              {!p.approved ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => approve(p.id)}
                    className="text-xs bg-green-600 px-2 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => remove(p.id)}
                    className="text-xs bg-red-600 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <span className="text-green-400 text-xs">Approved ✅</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}