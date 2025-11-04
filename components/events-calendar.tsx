"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import Image from "next/image";

type Event = {
  id: number;
  title: string;
  venue: string;
  date: string; // ISO
  time: string;
  price: string;
  category: string;
  image?: string;
  featured?: boolean;
};

const events: Event[] = [
  { id: 1, title: "DJ NEXUS Live", venue: "Skyline Rooftop", date: "2025-01-15", time: "10:00 PM", price: "$75", category: "Electronic", image: "/dj-performing-electronic-music.jpg", featured: true },
  { id: 2, title: "Neon Nights Party", venue: "Neon Underground", date: "2025-01-18", time: "11:00 PM", price: "$50", category: "House", image: "/neon-party-nightclub.jpg" },
  { id: 3, title: "Golden Gala", venue: "Golden Gate Club", date: "2025-01-20", time: "9:00 PM", price: "$150", category: "Luxury", image: "/luxury-gala-event.jpg", featured: true },
  { id: 4, title: "Sunset Sessions", venue: "Sunset Terrace", date: "2025-01-22", time: "8:00 PM", price: "$40", category: "Chill", image: "/sunset-terrace-party.jpg" },
  { id: 5, title: "Bass Drop Festival", venue: "Neon Underground", date: "2025-01-25", time: "11:30 PM", price: "$80", category: "Bass", image: "/bass-music-festival.jpg" },
  { id: 6, title: "VIP Exclusive Night", venue: "Skyline Rooftop", date: "2025-01-28", time: "10:30 PM", price: "$200", category: "VIP", image: "/vip-exclusive-nightclub.jpg", featured: true },
];

export function EventsCalendar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(events.map((e) => e.category)))], []);

  const filteredEvents = selectedCategory === "All" ? events : events.filter((e) => e.category === selectedCategory);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return iso;
    }
  };

  return (
    <section aria-labelledby="events-heading" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 id="events-heading" className="text-3xl md:text-4xl font-montserrat font-bold text-glow">
            Upcoming Events
          </h2>
          <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
            Don't miss out on the hottest events and exclusive performances — grab your tickets early.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 ${selectedCategory === cat ? "bg-primary text-primary-foreground animate-pulse-glow" : "border border-primary/20 text-primary hover:bg-primary/10"}`}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className={`glass-effect hover:scale-105 transition-all duration-300 ${event.featured ? "neon-border" : "border-primary/10"}`}>
              <div className="relative h-44 w-full">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover rounded-t-md" />
                {event.featured && <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">Featured</Badge>}
                <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">{event.category}</Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {event.venue}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{formatDate(event.date)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-bold text-primary">{event.price}</span>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground hover:scale-105 transition-transform">
                      <Ticket className="h-4 w-4" />
                      Get Tickets
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button size="lg" className="bg-primary text-primary-foreground px-8 py-3 font-bold animate-pulse-glow">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
