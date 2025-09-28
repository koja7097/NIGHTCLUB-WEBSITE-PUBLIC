import React from "react"
import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "Contact Us - TheNightCrew",
  description:
    "Get in touch with TheNightCrew for premium nightclub bookings and VIP experiences. 24/7 support available.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact TheNightCrew</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to experience the ultimate nightlife? Our team is here to help you plan the perfect night out with
              exclusive access to premium venues worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
