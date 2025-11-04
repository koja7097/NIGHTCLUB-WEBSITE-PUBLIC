"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BarItem = {
  id: number;
  name: string;
  image: string;
  category: string;
};

const barItems: BarItem[] = [
  { id: 1, name: "Premium Vodka", image: "/premium-vodka-bottle-bar-setup.jpg", category: "Spirits" },
  { id: 2, name: "Craft Cocktails", image: "/colorful-craft-cocktails-bar.jpg", category: "Cocktails" },
  { id: 3, name: "Whiskey Selection", image: "/whiskey-bottles-bar-shelf.jpg", category: "Spirits" },
  { id: 4, name: "Wine Collection", image: "/wine-bottles-cellar-bar.jpg", category: "Wine" },
  { id: 5, name: "Signature Drinks", image: "/neon-green-drinks-bar-nightclub.jpg", category: "Signature" },
  { id: 6, name: "Beer Selection", image: "/beer-taps-bar-setup.jpg", category: "Beer" },
  { id: 7, name: "Champagne", image: "/champagne-bottle-ice-bucket-bar.jpg", category: "Champagne" },
  { id: 8, name: "Blue Cocktails", image: "/blue-cocktail-martini-glass-bar.jpg", category: "Cocktails" },
  { id: 9, name: "Rum Collection", image: "/rum-bottles-tropical-bar-setup.jpg", category: "Spirits" },
  { id: 10, name: "Gin & Tonic", image: "/gin-tonic-glass-lime-bar.jpg", category: "Cocktails" },
  { id: 11, name: "Tequila Bar", image: "/tequila-shots-lime-salt-bar.jpg", category: "Spirits" },
  { id: 12, name: "Red Wine", image: "/red-wine-glass-bottle-bar-elegant.jpg", category: "Wine" },
];

export function BarSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section aria-labelledby="bars-heading" className="py-16 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="bars-heading" className="text-3xl md:text-4xl font-montserrat font-bold text-white">
            Featuring 4 fully stocked bars
          </h2>
          <p className="mt-2 text-gray-400 max-w-2xl mx-auto">
            From craft cocktails to premium spirits — style, taste, and experience served every night.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="relative">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full hover:bg-black/80 transition z-10 disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {barItems.map((item) => (
                <div
                  key={item.id}
                  className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_30%] lg:flex-[0_0_25%] px-2"
                >
                  <article className="group rounded-xl overflow-hidden border border-gray-800 bg-black/40 shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-56 w-full">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-white font-semibold text-lg">{item.name}</h3>
                        <p className="text-white/80 text-xs uppercase tracking-wide">{item.category}</p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between">
                      <button className="px-4 py-2 rounded-lg bg-[#FFD700] text-black font-semibold hover:scale-105 transition-transform">
                        View Menu
                      </button>
                      <div className="text-sm text-gray-400 uppercase tracking-wide">
                        Open 8 PM — 3 AM
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full hover:bg-black/80 transition z-10 disabled:opacity-40"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="mt-10 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-wide text-gray-400">
            <a className="hover:text-[#0FF] transition-colors" href="#social">SOCIAL</a>
            <a className="hover:text-[#0FF] transition-colors" href="#contact">CONTACT</a>
            <a className="hover:text-[#0FF] transition-colors" href="#directions">DIRECTIONS</a>
            <a className="hover:text-[#0FF] transition-colors" href="#reservations">RESERVATIONS</a>
          </div>
        </div>
      </div>
    </section>
  );
}
