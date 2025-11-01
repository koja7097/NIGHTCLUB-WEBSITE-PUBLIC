"use client"

import React from "react";
import { useEffect, useState, useMemo } from "react";
import { clubsDatas } from "@/src/ClubData/clubsDatas";
import { useRouter } from "next/navigation";

interface Club {
    id: string;
    name: string;
    location: string;
    timing: string;
    avgCost: string;
    hightlights? : string;
    notes: string;
}

export default function ClubDetails() {
    const router = useRouter();

    const [clubs, setClubs] = useState<Club[]>([]);
    const [search, setSearch] = useState("");
    const [locationFilter, setLocationFilter] = useState("all");
    const [costFilter, setCostFilter] = useState("all");

    useEffect(() => {
         //stimulate fetching data
         setTimeout(() => {
            setClubs(clubsDatas);
            console.log("loaded Clubs", clubsDatas)
         }, 500)
    }, []);

    const uniqueLocation = useMemo(()=> {
        const locations = Array.from(new Set(clubs.map((c) => c.location.trim())));
        return ["all", ...locations.filter(Boolean)];
    }, [clubs]);

    const filterClubs = clubs.filter((club)=> {
        const matchSearch = club.name?.toLowerCase().includes(search.toLowerCase()) ||
        club.location?.toLowerCase().includes(search.toLowerCase());

        const matchLocation =
        locationFilter === "all" || club.location.toLowerCase() === locationFilter.toLowerCase();

        const avgCost = Number(club.avgCost?.replace(/\D/g, "")) || 0;

        const matchCost = costFilter === "all" || 
        (costFilter === "low" && avgCost <= 1500) ||
        (costFilter === "meduim" && avgCost > 1500 && avgCost <= 1800 ) ||
        (costFilter === "high" && avgCost > 1800);
        
        return matchSearch && matchLocation && matchCost;
    });

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 text-white tracking-wide">Club Directory</h1>

            {/* Search + filter section */}
            <div className="bg-[#141414] p-4 rounded-xl mb-10 flex flex-wrap md:p-5 rounded-xl mb-10 flex flex-col gap-4
            md:gap-5  md:items-center md:justify-between shadow-lg shadow-black/40">
                <input
                type="text"
                placeholder="Search by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 bg-[#1e1e1e] text-gray-200 border border-gray-700 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <div className="flex flex-wrap gap-3 w-full md:w-auto justify-between sm:justify-start">
                    <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                       className="flex-1 w-full min-w-[150px] px-4 py-2 bg-[#1e1e1e] text-gray-200 border border-gray-700 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    {uniqueLocation.map((loc)=> (
                        <option key={loc} value={loc}>
                            {loc === "all" ? "All Locations" : loc}
                        </option>
                    ))}
                </select>

                   <select
                    value={costFilter}
                    onChange={(e) => setCostFilter(e.target.value)}
                       className=" px-4 py-2 bg-[#1e1e1e] text-gray-200 border border-gray-700 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="all">All cost</option>
                        <option value="low">Below ₹1500</option>
                                <option value="high">₹1500 - ₹2500</option>
                </select>
                </div>
            </div>
            {/* Club Card Grid */}
            {filterClubs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filterClubs.map((club)=> (
                        <div
                        key={club.id}
                        className="bg-[#141414] rounded-2xl overflow-hidden shadow-lg shadow-black/40
                        hover:shadow-purple-700/30 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="relative">
                                <img
                                src={`https://picsum.photos/400/250?random=${club.id}`}
                                alt={club.name}
                                className="w-full h-56 object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-purple-600/80 text-xs px-3 py-1 rounded-full font-semibold">
                                {club.hightlights?.split("")[0] || "Club"}
                                </div>
                            </div>

                            <div className="p-5">
                                <h2 className="text-xl font-semibold text-white mb-1">{club.name}</h2>
                                <p className="text-gray-400 text-sm mb-2">{club.location}</p>

                                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                                    <p>{club.timing}</p>
                                    <p className="font-meduim text-purple-400">{club.avgCost}</p>
                                </div>
                                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{club.notes || "A Vibrant place to relax and enjoy"}</p>

                                <button onClick={()=> router.push(`/payment/${club.id}`)} className="w-full bg-purple-600 hover:bg-purple-700 transition-all py-2 rounded-lg text-white
                                font-medium">View Details</button>
                            </div>
                     </div> 
                           
                    ))}
                    </div>
            ) : (
                <p className="text-center text-gray-400 mt-10">
                    No clubs match your search or filter
                </p>
            )}
        </div>
    )
}