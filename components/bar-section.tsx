"use client"

import Image from "next/image"

const barItems = [
  {
    id: 1,
    name: "Premium Vodka",
    image: "/premium-vodka-bottle-bar-setup.jpg",
    category: "Spirits",
  },
  {
    id: 2,
    name: "Craft Cocktails",
    image: "/colorful-craft-cocktails-bar.jpg",
    category: "Cocktails",
  },
  {
    id: 3,
    name: "Whiskey Selection",
    image: "/whiskey-bottles-bar-shelf.jpg",
    category: "Spirits",
  },
  {
    id: 4,
    name: "Wine Collection",
    image: "/wine-bottles-cellar-bar.jpg",
    category: "Wine",
  },
  {
    id: 5,
    name: "Signature Drinks",
    image: "/neon-green-drinks-bar-nightclub.jpg",
    category: "Signature",
  },
  {
    id: 6,
    name: "Beer Selection",
    image: "/beer-taps-bar-setup.jpg",
    category: "Beer",
  },
  {
    id: 7,
    name: "Champagne",
    image: "/champagne-bottle-ice-bucket-bar.jpg",
    category: "Champagne",
  },
  {
    id: 8,
    name: "Blue Cocktails",
    image: "/blue-cocktail-martini-glass-bar.jpg",
    category: "Cocktails",
  },
  {
    id: 9,
    name: "Rum Collection",
    image: "/rum-bottles-tropical-bar-setup.jpg",
    category: "Spirits",
  },
  {
    id: 10,
    name: "Gin & Tonic",
    image: "/gin-tonic-glass-lime-bar.jpg",
    category: "Cocktails",
  },
  {
    id: 11,
    name: "Tequila Bar",
    image: "/tequila-shots-lime-salt-bar.jpg",
    category: "Spirits",
  },
  {
    id: 12,
    name: "Red Wine",
    image: "/red-wine-glass-bottle-bar-elegant.jpg",
    category: "Wine",
  },
]

export function BarSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Featuring 4 fully stocked bars</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {barItems.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg border border-border bg-card">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wide">{item.name}</h3>
                  <p className="text-white/80 text-xs uppercase tracking-wider">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-sm uppercase tracking-wide text-muted-foreground">
            <span>SOCIAL</span>
            <span>CONTACT US</span>
            <span>DIRECTIONS</span>
            <span>RESERVATIONS</span>
          </div>
        </div>
      </div>
    </section>
  )
}
