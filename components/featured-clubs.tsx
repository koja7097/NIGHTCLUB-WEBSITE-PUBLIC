"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

type DJ = {
  id: string;
  name: string;
  genre?: string;
  startTime?: string;
  featured?: boolean;
  image?: string;
};

const STORAGE_KEY = "nightcrew_djs_v1";

const featuredClubs = [
  {
    id: "1",
    name: "Skyline Rooftop",
    location: "Manhattan, NY",
    rating: 4.8,
    image: "/luxury-rooftop-nightclub-with-city-skyline.jpg",
    price: "$150",
    capacity: 500,
    openHours: "10 PM - 4 AM",
    tags: ["Rooftop", "VIP", "City Views"],
    featured: true,
  },
  {
    id: "2",
    name: "Neon Underground",
    location: "Miami Beach, FL",
    rating: 4.9,
    image: "/underground-nightclub-with-neon-lights.jpg",
    price: "$120",
    capacity: 800,
    openHours: "11 PM - 5 AM",
    tags: ["Electronic", "Underground", "Late Night"],
  },
  {
    id: "3",
    name: "Golden Gate Club",
    location: "Las Vegas, NV",
    rating: 4.7,
    image: "/luxury-casino-nightclub-with-golden-decor.jpg",
    price: "$200",
    capacity: 1200,
    openHours: "9 PM - 6 AM",
    tags: ["Casino", "Luxury", "Shows"],
  },
  {
    id: "4",
    name: "Sunset Terrace",
    location: "Los Angeles, CA",
    rating: 4.6,
    image: "/outdoor-terrace-nightclub-with-sunset-views.jpg",
    price: "$100",
    capacity: 400,
    openHours: "8 PM - 2 AM",
    tags: ["Outdoor", "Sunset", "Cocktails"],
  },
];

export function FeaturedClubs() {
  const [featuredDJs, setFeaturedDJs] = useState<DJ[]>([]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const allDJs: DJ[] = JSON.parse(raw);
          setFeaturedDJs(allDJs.filter((dj) => dj.featured));
        }
      }
    } catch (err) {
      // fail silently and keep featuredClubs
      console.warn("Failed to load DJs from localStorage", err);
    }
  }, []);

  return (
    <section aria-labelledby="featured-heading" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id="featured-heading" className="text-3xl md:text-4xl font-montserrat font-bold">
            Featured Nightclubs & DJs
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Discover the hottest venues and exclusive experiences — curated for VIP nights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredClubs.map((club) => (
            <article key={club.id} className="group bg-card rounded-xl overflow-hidden border border-border shadow-md">
              <div className="relative h-48 w-full">
                <Image
                  src={club.image}
                  alt={club.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-neon">
                  {club.price}
                </div>
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm p-1.5 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
              </div>

              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-secondary transition-colors">
                  {club.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {club.location} • {club.openHours}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {club.tags.map((t) => (
                    <span key={t} className="text-xs uppercase px-2 py-1 bg-[#111] border border-border rounded-full text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-3">
                  <Link 
                  href={`/venues/${club.id}`}
                    className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow-neon hover:scale-105 transition-transform"
                    >
                      View Venue
                  </Link>
                  <Link 
                  href="/booking-room"
                     className="inline-block px-4 py-2 rounded-lg border border-border text-foreground hover:bg-white/5 transition-colors"
                     >
                      Book Now
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {/* featured DJs from local state */}
          {featuredDJs.map((dj) => (
            <article key={dj.id} className="group bg-card rounded-xl overflow-hidden border border-border shadow-md text-white">
              <div className="relative h-48 w-full bg-gray-800">
                {dj.image ? (
                  <Image src={dj.image} alt={dj.name} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover" />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">No image</div>
                )}
                <div className="absolute top-3 left-3 bg-yellow-600 text-black text-xs px-3 py-1 rounded-full">Featured</div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold">{dj.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{dj.genre || "Genre TBA"} • {dj.startTime || "Time TBA"}</p>
                <div className="mt-4">
                  <Link 
                  href="/booking-room"
                   className="block w-full text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow-neon hover:scale-105 transition-transform"
                    >
                      Book Now
  
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

