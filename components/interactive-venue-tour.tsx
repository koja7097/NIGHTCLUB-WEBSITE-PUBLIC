"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, MapPin, Users, Star, Camera, Maximize2 } from "lucide-react"

interface VenueSpot {
  id: string
  name: string
  description: string
  image: string
  capacity: number
  rating: number
  features: string[]
  position: { x: number; y: number }
}

const venueSpots: VenueSpot[] = [
  {
    id: "main-floor",
    name: "Main Dance Floor",
    description: "The heart of the action with state-of-the-art sound system and LED displays",
    image: "/vibrant-nightclub-scene-with-dancing-people-and-co.jpg",
    capacity: 500,
    rating: 4.9,
    features: ["Premium Sound", "LED Walls", "Fog Effects"],
    position: { x: 50, y: 60 },
  },
  {
    id: "vip-lounge",
    name: "VIP Lounge",
    description: "Exclusive area with premium bottle service and private seating",
    image: "/luxury-rooftop-nightclub-with-city-skyline.jpg",
    capacity: 50,
    rating: 5.0,
    features: ["Bottle Service", "Private Seating", "Dedicated Host"],
    position: { x: 20, y: 30 },
  },
  {
    id: "rooftop",
    name: "Rooftop Terrace",
    description: "Open-air space with stunning city views and cocktail bar",
    image: "/outdoor-terrace-nightclub-with-sunset-views.jpg",
    capacity: 200,
    rating: 4.8,
    features: ["City Views", "Cocktail Bar", "Fresh Air"],
    position: { x: 80, y: 20 },
  },
  {
    id: "bar-area",
    name: "Premium Bar",
    description: "Full-service bar with expert mixologists and premium spirits",
    image: "/luxury-casino-nightclub-with-golden-decor.jpg",
    capacity: 100,
    rating: 4.7,
    features: ["Expert Mixologists", "Premium Spirits", "Quick Service"],
    position: { x: 30, y: 80 },
  },
]

export function InteractiveVenueTour() {
  const [selectedSpot, setSelectedSpot] = useState<VenueSpot | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <section className="py-16 bg-card/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 neon-pink">Virtual Venue Tour</h2>
            <p className="text-xl text-muted-foreground">Explore our spaces before you arrive</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Interactive Map */}
            <Card className="glass-effect neon-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-primary">Club Layout</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="text-primary hover:text-accent"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="relative aspect-square bg-gradient-to-br from-background to-card rounded-lg border border-primary/20 overflow-hidden">
                  {/* Background venue layout */}
                  <div className="absolute inset-0 bg-[url('/vibrant-nightclub-scene-with-dancing-people-and-co.jpg')] bg-cover bg-center opacity-20" />

                  {/* Interactive hotspots */}
                  {venueSpots.map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => setSelectedSpot(spot)}
                      className={`absolute w-6 h-6 rounded-full border-2 transition-all duration-300 hover:scale-150 ${
                        selectedSpot?.id === spot.id
                          ? "bg-primary border-primary animate-pulse-glow scale-150"
                          : "bg-accent border-accent hover:bg-primary hover:border-primary"
                      }`}
                      style={{
                        left: `${spot.position.x}%`,
                        top: `${spot.position.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-30" />
                    </button>
                  ))}

                  {/* Floating labels */}
                  {venueSpots.map((spot) => (
                    <div
                      key={`label-${spot.id}`}
                      className={`absolute text-xs font-semibold transition-all duration-300 ${
                        selectedSpot?.id === spot.id ? "text-primary scale-110" : "text-foreground"
                      }`}
                      style={{
                        left: `${spot.position.x}%`,
                        top: `${spot.position.y - 8}%`,
                        transform: "translate(-50%, -100%)",
                      }}
                    >
                      {spot.name}
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">Click on the hotspots to explore different areas</p>
                </div>
              </CardContent>
            </Card>

            {/* Spot Details */}
            <Card className="glass-effect neon-border">
              <CardContent className="p-6">
                {selectedSpot ? (
                  <div className="space-y-6">
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <img
                        src={selectedSpot.image || "/placeholder.svg"}
                        alt={selectedSpot.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-2">{selectedSpot.name}</h3>
                        <div className="flex items-center gap-4 text-white/90">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span className="text-sm">{selectedSpot.capacity} capacity</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current text-yellow-400" />
                            <span className="text-sm">{selectedSpot.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-foreground leading-relaxed mb-4">{selectedSpot.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedSpot.features.map((feature) => (
                          <Badge
                            key={feature}
                            variant="secondary"
                            className="bg-primary/20 text-primary border-primary/30"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1 bg-primary hover:bg-accent text-primary-foreground">
                          <Eye className="mr-2 h-4 w-4" />
                          360° View
                        </Button>
                        <Button
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                        >
                          <Camera className="mr-2 h-4 w-4" />
                          Photos
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <MapPin className="h-16 w-16 text-primary/50 mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">Select a Location</h3>
                    <p className="text-muted-foreground">
                      Click on any hotspot on the map to explore that area of the venue
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Buttons */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {venueSpots.map((spot) => (
              <Button
                key={spot.id}
                variant={selectedSpot?.id === spot.id ? "default" : "outline"}
                onClick={() => setSelectedSpot(spot)}
                className={`p-4 h-auto flex flex-col items-center gap-2 transition-all duration-300 ${
                  selectedSpot?.id === spot.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-primary/30 text-foreground hover:border-primary hover:bg-primary/10"
                }`}
              >
                <div className="text-lg font-semibold">{spot.name}</div>
                <div className="text-xs opacity-80">{spot.capacity} capacity</div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
