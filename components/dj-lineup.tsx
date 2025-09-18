"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Music, Star, Calendar, MapPin } from "lucide-react"

const djLineup = [
  {
    id: 1,
    name: "DJ NEXUS",
    genre: "Electronic / Progressive House",
    rating: 4.9,
    image: "/professional-dj-electronic-music.jpg",
    venue: "Skyline Rooftop",
    date: "Jan 15, 2024",
    time: "10:00 PM",
    featured: true,
    bio: "International sensation known for mind-bending electronic sets",
  },
  {
    id: 2,
    name: "LUNA BEATS",
    genre: "Deep House / Techno",
    rating: 4.8,
    image: "/female-dj-deep-house-music.jpg",
    venue: "Neon Underground",
    date: "Jan 18, 2024",
    time: "11:00 PM",
    bio: "Rising star in the underground scene with hypnotic beats",
  },
  {
    id: 3,
    name: "BASS KING",
    genre: "Dubstep / Bass",
    rating: 4.7,
    image: "/dj-bass-music-dubstep.jpg",
    venue: "Golden Gate Club",
    date: "Jan 20, 2024",
    time: "12:00 AM",
    featured: true,
    bio: "Heavy bass drops and explosive energy guaranteed",
  },
  {
    id: 4,
    name: "SUNSET VIBES",
    genre: "Chill House / Ambient",
    rating: 4.6,
    image: "/dj-sunset-chill-music.jpg",
    venue: "Sunset Terrace",
    date: "Jan 22, 2024",
    time: "8:00 PM",
    bio: "Perfect soundtrack for golden hour moments",
  },
]

export function DJLineup() {
  return (
    <section className="py-16 bg-card/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-glow">Featured DJ Lineup</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience world-class performances from the hottest DJs and artists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {djLineup.map((dj) => (
            <Card
              key={dj.id}
              className={`glass-effect hover:scale-105 transition-all duration-300 group ${dj.featured ? "neon-border" : "border-primary/20"}`}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={dj.image || "/placeholder.svg"}
                  alt={dj.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {dj.featured && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground animate-pulse-glow">
                    Featured
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1 text-glow">{dj.name}</h3>
                  <p className="text-primary font-semibold">{dj.genre}</p>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-foreground font-semibold">{dj.rating}</span>
                    </div>
                    <Music className="h-5 w-5 text-primary" />
                  </div>

                  <p className="text-muted-foreground text-sm">{dj.bio}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{dj.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>
                        {dj.date} at {dj.time}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-secondary text-primary-foreground transition-all duration-300 hover:scale-105">
                    Book This DJ
                  </Button>
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
            View All DJs
          </Button>
        </div>
      </div>
    </section>
  )
}
