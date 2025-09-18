"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "TheNightCrew made our bachelor party unforgettable! VIP treatment at the best clubs in Miami.",
    location: "Miami, FL",
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Seamless booking process and amazing customer service. Got us into exclusive venues we never could have accessed.",
    location: "Las Vegas, NV",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Professional, reliable, and they know all the best spots. Our corporate event was a huge success!",
    location: "New York, NY",
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Best nightlife booking service hands down. They handle everything so you can just enjoy the night.",
    location: "Los Angeles, CA",
  },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust TheNightCrew for their nightlife experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">"{testimonial.text}"</p>

                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground text-sm">{testimonial.name}</div>
                    <div className="text-muted-foreground text-xs">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
