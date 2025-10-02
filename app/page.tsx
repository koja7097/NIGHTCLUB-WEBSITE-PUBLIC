import React from "react"
import { Navigation } from "@/components/navigation"
import { MobileOptimizedHero } from "@/components/mobile-optimized-hero"
import { FeaturedClubs } from "@/components/featured-clubs"
import { Testimonials } from "@/components/testimonials"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ImageGallery } from "@/components/image-gallery"
import { BookingForm } from "@/components/booking-form"
import { EventsCalendar } from "@/components/events-calendar"
import { DJLineup } from "@/components/dj-lineup"
import { InteractiveMusicPlayer } from "@/components/interactive-music-player"
import { InteractiveVenueTour } from "@/components/interactive-venue-tour"
import { BarSection } from "@/components/bar-section"

const galleryImages = [
  {
    id: "1",
    src: "/luxury-rooftop-nightclub-with-city-skyline.jpg",
    alt: "Luxury rooftop nightclub",
    title: "Skyline Views",
  },
  {
    id: "2",
    src: "/underground-nightclub-with-neon-lights.jpg",
    alt: "Underground club with neon",
    title: "Neon Nights",
  },
  {
    id: "3",
    src: "/luxury-casino-nightclub-with-golden-decor.jpg",
    alt: "Casino nightclub",
    title: "Golden Luxury",
  },
  {
    id: "4",
    src: "/outdoor-terrace-nightclub-with-sunset-views.jpg",
    alt: "Outdoor terrace club",
    title: "Sunset Terrace",
  },
  {
    id: "5",
    src: "/vibrant-nightclub-scene-with-dancing-people-and-co.jpg",
    alt: "Vibrant nightclub scene",
    title: "Dance Floor Energy",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <BarSection />
      <MobileOptimizedHero />
      <FeaturedClubs />
      <EventsCalendar />
      <DJLineup />
      <InteractiveMusicPlayer />
      <InteractiveVenueTour />
      <BookingForm />
      <ImageGallery images={galleryImages} title="Experience Our Venues" />
      <Testimonials />
      <FAQSection />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
