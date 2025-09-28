import React from "react"
import { Navigation } from "@/components/navigation"
import { BookingForm } from "@/components/booking-form"
import { Footer } from "@/components/footer"

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <BookingForm />
      </div>
      <Footer />
    </main>
  )
}
