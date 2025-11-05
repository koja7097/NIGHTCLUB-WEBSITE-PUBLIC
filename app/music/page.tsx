"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import ProtectedRoute from "@/components/ProtectedRoutes";

export default function MusicPage() {
  const tracks = [
    {
      id: 1,
      title: "Midnight Pulse",
      artist: "DJ Skyline",
      genre: "Techno",
      image: "/dj-music-neon.jpg",
    },
    {
      id: 2,
      title: "Neon Waves",
      artist: "DJ Luminous",
      genre: "House",
      image: "/dj-light-show.jpg",
    },
    {
      id: 3,
      title: "Afterhours Flow",
      artist: "DJ Velvet",
      genre: "Deep House",
      image: "/dj-dance-floor.jpg",
    },
  ];

  return (
    <ProtectedRoute>
      <main>
        <Navigation />
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-8 text-primary">
            NightCrew Music
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto font-poppins">
            Experience electrifying beats and live mixes from the city’s hottest DJs — curated for the perfect nightlife vibe.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg hover:scale-105 transition-transform"
              >
                <div className="relative h-56">
                  <Image
                    src={track.image}
                    alt={track.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col items-center">
                  <h3 className="text-xl font-semibold text-primary mb-1">
                    {track.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {track.artist} • {track.genre}
                  </p>
                  <Link
                    href="/booking-room"
                    className="mt-4 px-5 py-2 bg-primary text-black rounded-full font-semibold hover:opacity-90 transition"
                  >
                    Listen Live
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}