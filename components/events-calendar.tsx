"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Ticket } from "lucide-react"

const events = [
  {
    id: 1,
    title: "DJ NEXUS Live",
    venue: "Skyline Rooftop",
    date: "2024-01-15",
    time: "10:00 PM",
    price: "$75",
    category: "Electronic",
    image: "/dj-performing-electronic-music.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Neon Nights Party",
    venue: "Neon Underground",
    date: "2024-01-18",
    time: "11:00 PM",
    price: "$50",
    category: "House",
    image: "/neon-party-nightclub.jpg",
  },
  {
    id: 3,
    title: "Golden Gala",
    venue: "Golden Gate Club",
    date: "2024-01-20",
    time: "9:00 PM",
    price: "$150",
    category: "Luxury",
    image: "/luxury-gala-event.jpg",
    featured: true,
  },
  {
    id: 4,
    title: "Sunset Sessions",
    venue: "Sunset Terrace",
    date: "2024-01-22",
    time: "8:00 PM",
    price: "$40",
    category: "Chill",
    image: "/sunset-terrace-party.jpg",
  },
  {
    id: 5,
    title: "Bass Drop Festival",
    venue: "Neon Underground",
    date: "2024-01-25",
    time: "11:30 PM",
    price: "$80",
    category: "Bass",
    image: "/bass-music-festival.jpg",
  },
  {
    id: 6,
    title: "VIP Exclusive Night",
    venue: "Skyline Rooftop",
    date: "2024-01-28",
    time: "10:30 PM",
    price: "$200",
    category: "VIP",
    image: "/vip-exclusive-nightclub.jpg",
    featured: true,
  },
]

export function EventsCalendar() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const categories = ["All", "Electronic", "House", "Luxury", "Chill", "Bass", "VIP"]

  const filteredEvents =
    selectedCategory === "All" ? events : events.filter((event) => event.category === selectedCategory)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-glow">Upcoming Events</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't miss out on the hottest events and exclusive performances
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground animate-pulse-glow"
                  : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              } transition-all duration-300`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className={`glass-effect hover:scale-105 transition-all duration-300 ${event.featured ? "neon-border" : "border-primary/20"}`}
            >
              <div className="relative">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {event.featured && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground animate-pulse-glow">
                    Featured
                  </Badge>
                )}
                <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">{event.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-primary">{event.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {event.venue}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-bold text-primary">{event.price}</span>
                    <Button className="bg-primary hover:bg-secondary text-primary-foreground transition-all duration-300 hover:scale-105">
                      <Ticket className="mr-2 h-4 w-4" />
                      Get Tickets
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary hover:bg-secondary text-primary-foreground px-8 py-4 text-lg font-bold animate-pulse-glow"
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  )
}
