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
      {/* sideBar */}
      <aside className="flex flex-col fixed inset-y-0 left-0 bg-black w-16 md:w-64 transition-all duration-300">
      <SideSection activeTap={activeTap} setActiveTap={setActiveTap}/>
      </aside>

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
    </div>
    </>
    )
}
