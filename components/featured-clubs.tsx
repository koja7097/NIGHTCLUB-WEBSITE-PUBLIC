"use client"

import React, {useEffect, useState} from "react"
import { ClubCard } from "./club-card"
import { Star } from "lucide-react";
import Link from "next/link";

type DJ = {
id: string;
  name: string;
  genre?: string;
  startTime?: string;
  featured?: boolean;
  image?: string;
};

const KEY = "nightcrew_djs_v1";

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
]

export function FeaturedClubs() {
  const [featuredDJs, setFeaturedDJs] = useState<DJ[]>([]);

  //Load Djs from LocalStorage
  useEffect(()=> {
    const raw = localStorage.getItem(KEY);
    if(raw) {
      const allDJs: DJ[] = JSON.parse(raw);
      const featured = allDJs.filter((dj)=> dj.featured);
      setFeaturedDJs(featured)
    }
  }, []);
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Nightclubs & DJs</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the hottest venues and exclusive experiences in top cities worldwide
            & Featured DJs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredClubs.map((club) => (
            <ClubCard key={club.id} {...club} />
          ))}

          {/* featured club from DjManager */}
          {featuredDJs.map((dj)=> (
            <div
            key={dj.id}
            className="bg-dark rounded=xl overflow-hidden shadow-md text-white hover:shadow-gray-500/30
            transition-all duration-300 text-center group border border-gray-800"
            >
              <div className=" relative w-full h-48 bg-gray-700 rounded-t-xl overflow-hidden mb-2">
               {dj.image ? (
                <img
                 src={dj.image} alt={dj.name}
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
               ) : (

               <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                 No image
               </div>
               )} 
               
               <div className="absolute top-3 left-3 bg-yellow-600 text-white text-xs px-3 py-1 rounded-full shadow-md">Featured</div>

               <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full p-1.5 flex items-center justify-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
               </div>
              </div>
            <div className="p-4 flex-grow">
                  <h3 className="text-lg font-semibold text-white group-hover:text-pink-400 transition-colors">{dj.name}</h3>
              <p className="text-gray-400 text-sm mt-1">
                {dj.genre || "unknown Genre"} - {dj.startTime || " Show Time TBA"}
              </p>
              <p className="text-pink-500 font-meduim mt-3">Fearured DJ</p>
            </div>
            <div className="p-4 pt-0">
              <Link href="/booking-room">
              <button className="w-full bg-white text-gray-900 font-semibold py-2 rounded-lg
              hover:bg-gray-100 transition-colors duration-300 hover:bg-gray-800">
                Book Now
              </button>
              </Link>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
