"use client"
import React from "react";
import {useState} from "react"
import { Navigation } from "@/components/navigation";
import { mockEvents, mockFeed, mockBooking , EventItem, Booking, FeedPost} from "@/lib/mockData";
import SideSection from "@/components/SideSection";
import EventSection from "@/components/EventSection";
import FeedSection from "@/components/FeedSection";
import BookingSection from "@/components/BookingSection";





export default function DashboardPage() {

    // Authentication
    const [isUnlocked, setIsUnlocked] = useState(false)
     const [loginInput, setLoginInput] = useState("")
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
      } 


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
}

// Booking Management

/* const updateBookingStatus = (id: string, status: "accepted" | "rejected") => {
    setBooking(
        booking.map((b)=> (b.id === id ? {...b, status}: b))
    )
} */


    return (
        <>
         <Navigation/>
    <div className="flex min-h-screen">

    {/* Login */}
    {!isUnlocked && (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex item-center justify-center z-50">
    <div className="bg-gray p-8 rounded-xl shadow-lg w-96 text-center">
    <h2 className="text-xl font-semibold mb-4">Enter Pin or Name</h2>
    <input type="text"
    placeholder="Enter Pin or Name"
    value={loginInput}
    onChange={(e)=> setLoginInput(e.target.value)}
    className="border w-full p-2 rounded mb-4"
    />
    {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
    <button
    onClick={handleLogin}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
    >Unlock</button>
    </div>
    </div>
    )}


    
      <aside className="flex flex-col fixed inset-y-0 left-0 bg-black w-18 md:w-44 transition-all duration-300">
      <SideSection activeTap={activeTap} setActiveTap={setActiveTap}/>
      </aside>
          {isUnlocked && (
          <main className="flex-1 p-6 space-y-10 overflow-y-auto ml-16 md:ml-64 w-full">
         <div className="flex items-center justify-between p-3 shadow sticky top-0 z-30 md:hidden">
              <h1 className="text-2xl font-bold text-center">Club Owners Dashboard</h1>
         </div>
        
        
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
       booking={booking}
       />
     )}

        </main>
        )}
    </div>
    
    </>
    )
}
