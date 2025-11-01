import React from "react"
import { Navigation } from "@/components/navigation"
import { BookingForm } from "@/components/booking-form"
import { Footer } from "@/components/footer"
import ProtectedRoute from "@/components/ProtectedRoutes"

export default function BookingPage() {
  return (
    <ProtectedRoute>
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <BookingForm />
      </div>
      <Footer />
    </main>
    </ProtectedRoute>
  )
}
