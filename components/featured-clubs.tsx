import { ClubCard } from "./club-card"

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
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Nightclubs</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the hottest venues and exclusive experiences in top cities worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredClubs.map((club) => (
            <ClubCard key={club.id} {...club} />
          ))}
        </div>
      </div>
    </section>
  )
}
