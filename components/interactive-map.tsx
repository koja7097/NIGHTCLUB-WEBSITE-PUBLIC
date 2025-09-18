"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Phone, Clock } from "lucide-react"

const venues = [
  {
    id: 1,
    name: "Skyline Rooftop",
    address: "123 Manhattan Ave, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    hours: "10 PM - 4 AM",
    coordinates: { x: 25, y: 30 },
    category: "Rooftop",
  },
  {
    id: 2,
    name: "Neon Underground",
    address: "456 Ocean Drive, Miami Beach, FL 33139",
    phone: "+1 (555) 234-5678",
    hours: "11 PM - 5 AM",
    coordinates: { x: 60, y: 70 },
    category: "Underground",
  },
  {
    id: 3,
    name: "Golden Gate Club",
    address: "789 Strip Blvd, Las Vegas, NV 89109",
    phone: "+1 (555) 345-6789",
    hours: "9 PM - 6 AM",
    coordinates: { x: 15, y: 60 },
    category: "Casino",
  },
  {
    id: 4,
    name: "Sunset Terrace",
    address: "321 Sunset Blvd, Los Angeles, CA 90028",
    phone: "+1 (555) 456-7890",
    hours: "8 PM - 2 AM",
    coordinates: { x: 10, y: 50 },
    category: "Outdoor",
  },
]

export function InteractiveMap() {
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null)

  return (
    <section className="py-16 bg-card/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-glow">Find Our Venues</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our premium locations across major cities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Interactive Map */}
          <Card className="glass-effect neon-border">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <MapPin className="h-6 w-6" />
                Venue Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg h-96 overflow-hidden">
                {/* Map Background */}
                <div className="absolute inset-0 bg-[url('/placeholder.svg?key=map')] bg-cover bg-center opacity-20" />

                {/* Venue Markers */}
                {venues.map((venue) => (
                  <button
                    key={venue.id}
                    onClick={() => setSelectedVenue(venue.id)}
                    className={`absolute w-6 h-6 rounded-full border-2 transition-all duration-300 hover:scale-125 ${
                      selectedVenue === venue.id
                        ? "bg-primary border-primary animate-pulse-glow scale-125"
                        : "bg-secondary border-secondary hover:bg-primary hover:border-primary"
                    }`}
                    style={{
                      left: `${venue.coordinates.x}%`,
                      top: `${venue.coordinates.y}%`,
                    }}
                  >
                    <span className="sr-only">{venue.name}</span>
                  </button>
                ))}

                {/* City Labels */}
                <div className="absolute top-4 left-4 text-primary font-bold">NYC</div>
                <div className="absolute bottom-4 right-4 text-primary font-bold">Miami</div>
                <div className="absolute top-1/2 left-4 text-primary font-bold">Vegas</div>
                <div className="absolute bottom-1/3 left-8 text-primary font-bold">LA</div>
              </div>
            </CardContent>
          </Card>

          {/* Venue Details */}
          <div className="space-y-4">
            {venues.map((venue) => (
              <Card
                key={venue.id}
                className={`glass-effect cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedVenue === venue.id ? "neon-border" : "border-primary/20"
                }`}
                onClick={() => setSelectedVenue(venue.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">{venue.name}</h3>
                      <Badge className="bg-secondary text-secondary-foreground">{venue.category}</Badge>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-secondary text-primary-foreground">
                      <Navigation className="h-4 w-4 mr-1" />
                      Directions
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">{venue.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm">{venue.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm">{venue.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
