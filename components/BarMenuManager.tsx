"use client";

import React, { useState, useEffect } from "react";
import { saveToStorage, loadFromStorage } from "@/lib/storage";

export type Drink = {
  id: string;
  name: string;
  price: string;
  status: "available" | "out";
  image?: string; // data URL or external
};

const STORAGE_KEY = "nightcrew_bar_menu_v1";

export default function BarMenuManager() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState<Drink["status"]>("available");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [hydrated, setHydrated] = useState(false);

  //Loads from localStorage only when window exists
  useEffect(() => {
    if (typeof window !== 'undefined') {
    const saved = loadFromStorage<Drink[]>(STORAGE_KEY, []);
    setDrinks(saved);
    setHydrated(true);
    }
  }, []);
// Saves to localStorage whenever Data changes (after hydration)
  useEffect(() => {
    if (hydrated) {
    saveToStorage(STORAGE_KEY, drinks);
    }
  }, [drinks, hydrated]);

  const addDrink = async () => {
    if (!name || !price) return;
    let imageUrl: string | undefined = undefined;
    if (imageFile) {
      imageUrl = await toDataUrl(imageFile);
    }
    setDrinks([
      ...drinks,
      { id: crypto.randomUUID(), name, price, status, image: imageUrl },
    ]);
    setName("");
    setPrice("");
    setStatus("available");
    setImageFile(null);
  };

  const removeDrink = (id: string) => {
    setDrinks(drinks.filter((d) => d.id !== id));
  };

  const toggleStatus = (id: string) => {
    setDrinks(
      drinks.map((d) =>
        d.id === id ? { ...d, status: d.status === "available" ? "out" : "available" } : d
      )
    );
  };

  return (
    <div className="bg-dark text-white p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold">Bar Menu Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          <input
            className="w-full bg-gray-800 border border-gray-700 p-2 rounded"
            placeholder="Drink name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full bg-gray-800 border border-gray-700 p-2 rounded"
            placeholder="Price (e.g. $20)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <select
            className="w-full bg-gray-800 border border-gray-700 p-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value as Drink["status"])}
          >
            <option value="available">Available</option>
            <option value="out">Out of stock</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="w-full"
          />

          <div className="flex gap-2">
            <button
              onClick={addDrink}
              className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded"
            >
              Add Drink
            </button>
            <button
              onClick={() => {
                setName("");
                setPrice("");
                setStatus("available");
                setImageFile(null);
              }}
              className="bg-gray-700 px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="bg-dark p-4 rounded col-span-1">
          <h3 className="font-medium mb-2">Preview</h3>
          {imageFile ? (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="preview"
              className="w-full rounded"
            />
          ) : (
            <div className="w-full h-40 bg-gray-700 rounded flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
          <p className="mt-2 text-sm text-gray-400">Name: {name || "—"}</p>
          <p className="text-sm text-gray-400">Price: {price || "—"}</p>
          <p className="text-sm text-gray-400">Status: {status}</p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Menu Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {drinks.length === 0 && (
            <div className="text-gray-400">No drinks yet. Add a drink above.</div>
          )}
          {drinks.map((d) => (
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
                      <p className="text-sm text-gray-400">{d.price}</p>
                    </div>
                    <div className="text-sm">
                      <button
                        onClick={() => toggleStatus(d.id)}
                        className="text-xs px-2 py-1 rounded bg-gray-700"
                      >
                        {d.status === "available" ? "Available" : "Out"}
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => removeDrink(d.id)}
                      className="text-xs bg-red-600 px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// utility: convert image to data URL
function toDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(String(reader.result));
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}