"use client"
import React from "react";
import {useEffect,useState} from "react"
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { mockEvents, mockFeed, mockBooking , EventItem, Booking, FeedPost} from "@/lib/mockData";
import SideSection from "@/components/SideSection";
import EventSection from "@/components/EventSection";
import FeedSection from "@/components/FeedSection";
import BookingSection from "@/components/BookingSection";
import StatsOverview from "@/components/StatsOverview";
import BarMenuManager from "@/components/BarMenuManager";
import GuestSection from "@/components/GuestSection";
import DJManager from "@/components/DjManager";
import MediaGalleryManager from "@/components/MediaGalleryManager";





export default function DashboardPage() {
const router = useRouter();

//protected Route
useEffect(()=> {
    const auth = localStorage.getItem("nightcrew_auth");
    if(!auth) {
        router.replace("/login");
    }else {
        setIsUnlocked(true);
    }
}, [router]);
    // Authentication
    const [isUnlocked, setIsUnlocked] = useState(false)
    /* const [loginInput, setLoginInput] = useState("")
      const [error, setError] = useState("")

      // settings: Allowed Pin or Name
      const allowedPin = "123456"
      const allowedName = "Club Owner"

      const handleLogin = () => {
        if (loginInput === allowedPin || loginInput.toLowerCase() === allowedName.toLowerCase()) {
            setIsUnlocked(true)
            setError("")
        } else {
            setError("Access Denied. Wrong Pin or Name.")
        }
      }  */


    //States & Management

    const [activeTap, setActiveTap] = useState("events")

const [events, setEvents] = useState<EventItem[]>(mockEvents)
const [feed, setFeed] = useState<FeedPost[]>(mockFeed)
const [booking,/*  setBooking */] = useState<Booking[]>(mockBooking)

//Event Management
const [newEvent, setNewEvent] = useState<EventItem>({
    id: crypto.randomUUID(),
    name: "",
    date: "",
    time: "",
    description: "",
    fee: "",
    location: "",
    media: [],
})

const addEvent = () => {
    if(!newEvent.name) return
    setEvents([...events, {...newEvent, id: crypto.randomUUID()}])
    setNewEvent({
    id: crypto.randomUUID(),
    name: "",
    date: "",
    time: "",
    description: "",
    fee: "",
    location: "",
    media: [],
    })
}

// Feed Management

const [newPost, setNewPost] = useState<FeedPost>({
    id: "",
    caption: "",
    media: "",
    createdAt: "",
})

const addPost = () => {
    if(!newPost.caption) return
    setFeed([
        {
            id: crypto.randomUUID(),
            caption: newPost.caption,
            media: newPost.media || "https://picsum.photos/200/300?random-10",
            createdAt: new Date().toISOString(),
        },
        ...feed,
    ])
    setNewPost({id: "", caption: "", media: "", createdAt: ""})
};
if(!isUnlocked) {
    return null // dont render until verified
}

// Booking Management

/* const updateBookingStatus = (id: string, status: "accepted" | "rejected") => {
    setBooking(
        booking.map((b)=> (b.id === id ? {...b, status}: b))
    )
} */
  // Stats & chart data (example / derived from current mock data)
  const statsData = [
    { label: "Upcoming Events", value: events.length },
    { label: "Bookings", value: booking.length },
    { label: "Tickets Sold", value: 230 }, // example
    { label: "Revenue", value: "$2,400" }, // example
  ];

  const chartData = [
    { name: "Mon", value: 40 },
    { name: "Tue", value: 30 },
    { name: "Wed", value: 60 },
    { name: "Thu", value: 80 },
    { name: "Fri", value: 120 },
    { name: "Sat", value: 150 },
    { name: "Sun", value: 90 },
  ];

    return (
        <>
         <Navigation/>
    <div className="flex min-h-screen">


      <aside className="flex flex-col fixed inset-y-0 left-0 bg-black w-18 md:w-44 transition-all duration-300">
      <SideSection activeTap={activeTap} setActiveTap={setActiveTap}/>
      </aside>

          <main className="flex-1 flex-wrap  p-6 space-y-10 overflow-y-auto ml-16 md:ml-64 w-full">
         <div className="flex items-center justify-between p-3 shadow sticky top-0 z-30 md:hidden">
              <h1 className="text-2xl font-bold text-center">Club Owners Dashboard</h1>
         </div>
        
        
           {activeTap === "overview" && (
             <StatsOverview stats={statsData} chartData={chartData}/>
            )}

           {activeTap === "events" && (
             <EventSection
            events={events} 
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            addEvent={addEvent}
            />
           )}
        
        {activeTap === "feed" && (
        <FeedSection
        feed={feed}
        newPost={newPost}
        setNewPost={setNewPost}
        addPost={addPost}
        />
        )}
           
     {activeTap === "booking" && (
          <BookingSection
       />
     )}

     {activeTap === "barMenu" && (
        <BarMenuManager/>
     )}
    
     {activeTap === "guestSection" && (
        <GuestSection/>
     )}

     {activeTap === "dj" && (
        <DJManager/>
     )}
    
    
     {activeTap === "media" && (
        <MediaGalleryManager/>
     )}

        </main>
    </div>
    
    </>
    )
}
