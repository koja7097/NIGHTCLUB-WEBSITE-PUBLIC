"use client"

import React, { useEffect, useState} from "react";
import { saveToStorage, loadFromStorage } from "@/lib/storage";

type DJ = {
id: string;
  name: string;
  genre?: string;
  startTime?: string;
  featured?: boolean;
  image?: string;
};

const KEY = "nightcrew_djs_v1";

export default function DJManager() {
  const [djs, setDjs] = useState<DJ[]>([]);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [startTime, setStartTime] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [hydrated, setHydrated] = useState(false);

  //Loads from localStorage only when window exists
  useEffect(() => {
    if (typeof window !== 'undefined') {
    const saved = loadFromStorage<DJ[]>(KEY, []);
    setDjs(saved);
    setHydrated(true);
    }
  }, []);
// Saves to localStorage whenever Data changes (after hydration)
  useEffect(() => {
    if (hydrated) {
    saveToStorage(KEY, djs);
    }
  }, [djs, hydrated]);

  const addDJ = async () => {
    if (!name) return;
    let image;
    if (imageFile) image = await toDataUrl(imageFile);
    setDjs([{ id: crypto.randomUUID(), name, genre, startTime, image, featured: false }, ...djs]);
    setName("");
    setGenre("");
    setStartTime("");
    setImageFile(null);
  };

  const remove = (id: string) => setDjs(djs.filter((d) => d.id !== id));
  const toggleFeature = (id: string) =>
    setDjs(djs.map((d) => (d.id === id ? { ...d, featured: !d.featured } : d)));

  return (
    <div className="bg-dark text-white p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold">DJ & Performer Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-2">
          <input
            placeholder="DJ / Performer name"
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Genre (House, Afrobeats...)"
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <input
            placeholder="Start time (e.g. 10:00 PM)"
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          />
          <div className="flex gap-2">
            <button onClick={addDJ} className="bg-pink-600 px-4 py-2 rounded">Add</button>
            <button
              onClick={() => {
                setName("");
                setGenre("");
                setStartTime("");
                setImageFile(null);
              }}
              className="bg-gray-700 px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="bg-gray-800 p-3 rounded">
          <h3 className="font-medium">Tips</h3>
          <p className="text-sm text-gray-400">Feature a DJ to show them on the homepage.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {djs.length === 0 && <div className="text-gray-400">No DJs added yet.</div>}
        {djs.map((d) => (
          <div key={d.id} className="bg-gray-800 p-3 rounded">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gray-700 rounded overflow-hidden">
                {d.image ? (
                  
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{d.name}</h4>
                    <p className="text-sm text-gray-400">{d.genre} • {d.startTime}</p>
                  </div>
                  <div className="text-sm">
                    <button
                      onClick={() => toggleFeature(d.id)}
                      className={`text-xs px-2 py-1 rounded ${d.featured ? "bg-yellow-500" : "bg-gray-700"}`}
                    >
                      {d.featured ? "Featured" : "Feature"}
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => remove(d.id)} className="text-xs bg-red-600 px-2 py-1 rounded">Remove</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function toDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result));
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}