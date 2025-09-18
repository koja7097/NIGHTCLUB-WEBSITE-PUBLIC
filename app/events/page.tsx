import { Navigation } from "@/components/navigation"
import { EventsCalendar } from "@/components/events-calendar"
import { DJLineup } from "@/components/dj-lineup"
import { Footer } from "@/components/footer"

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <EventsCalendar />
        <DJLineup />
      </div>
      <Footer />
    </main>
  )
}
