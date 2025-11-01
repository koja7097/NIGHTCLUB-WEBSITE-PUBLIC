"use client";

import React, { useState, useEffect } from "react";
import { saveToStorage, loadFromStorage } from "@/lib/storage";

type Media = {
  id: string;
  url: string; // data URL for preview
  caption?: string;
  event?: string;
  createdAt: string;
};

const KEY = "nightcrew_media_v1";

export default function MediaGalleryManager() {
  const [media, setMedia] = useState<Media[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [eventTag, setEventTag] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
    const saved = loadFromStorage<Media[]>(KEY, []);
    setMedia(saved);
    setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
    saveToStorage(KEY, media);
    }
  }, [media, hydrated]);

  const upload = async () => {
    if (!file) return;
    const url = await toDataUrl(file);
    const m: Media = {
      id: crypto.randomUUID(),
      url,
      caption,
      event: eventTag,
      createdAt: new Date().toISOString(),
    };
    setMedia([m, ...media]);
    setFile(null);
    setCaption("");
    setEventTag("");
  };

  const remove = (id: string) => setMedia(media.filter((m) => m.id !== id));

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold">Media Gallery Manager</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-2">
          <input type="file" accept="image/*,video/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          <input
            placeholder="Caption"
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <input
            placeholder="Event tag (optional)"
            className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            value={eventTag}
            onChange={(e) => setEventTag(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={upload} className="bg-pink-600 px-4 py-2 rounded">Upload</button>
            <button onClick={() => { setFile(null); setCaption(""); setEventTag(""); }} className="bg-gray-700 px-4 py-2 rounded">Reset</button>
          </div>
        </div>

        <div className="bg-gray-800 p-3 rounded">
          <h3 className="font-medium">Preview</h3>
          {file ? (
            
            <img src={URL.createObjectURL(file)} alt="preview" className="w-full rounded" />
          ) : (
            <div className="w-full h-40 bg-gray-700 rounded flex items-center justify-center text-gray-400">No file selected</div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {media.length === 0 && <div className="text-gray-400">No media yet.</div>}
          {media.map((m) => (
            <div key={m.id} className="bg-gray-800 p-2 rounded">
              <div className="w-full h-40 bg-black rounded overflow-hidden">
                {/* preview image */}
                <img src={m.url} alt={m.caption} className="w-full h-full object-cover" />
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">{m.caption || "No caption"}</div>
                  <div className="text-xs text-gray-400">{m.event || "—"}</div>
                </div>
                <div>
                  <button onClick={() => remove(m.id)} className="text-xs bg-red-600 px-2 py-1 rounded">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
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