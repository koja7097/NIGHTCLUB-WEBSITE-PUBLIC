"use client";

import React from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import ProtectedRoute from "@/components/ProtectedRoutes";

export default function BarPage() {
  const drinks = [
    { id: 1, name: "Golden Glow", type: "Cocktail", price: "$25", image: "/luxury-cocktail.jpg" },
    { id: 2, name: "Neon Shot", type: "Shot", price: "$15", image: "/neon-shot-drink.jpg" },
    { id: 3, name: "Midnight Whiskey", type: "Whiskey", price: "$30", image: "/whiskey-glass.jpg" },
  ];

  return (
    <ProtectedRoute>
      <main>
        <Navigation />
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-8 text-primary">
            NightCrew Bar
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto font-poppins">
            Sip and savor luxury — explore our signature cocktails and premium drinks crafted to perfection.
          </p>

          <div className="flex gap-6 overflow-x-auto snap-x pb-6 scrollbar-hide">
            {drinks.map((drink) => (
              <div
                key={drink.id}
                className="snap-center shrink-0 w-72 bg-card rounded-2xl overflow-hidden border border-border shadow-lg hover:scale-105 transition-transform"
              >
                <div className="relative h-56">
                  <Image
                    src={drink.image}
                    alt={drink.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-primary mb-1">{drink.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {drink.type} • {drink.price}
                  </p>
                  <button className="mt-4 px-5 py-2 bg-primary text-black rounded-full font-semibold hover:opacity-90 transition">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}