import React from "react";
import { EventItem } from "@/lib/mockData";

type EventsProps = {
    events: EventItem[]
    newEvent:EventItem
    setNewEvent: (ev: EventItem) => void
    addEvent: () => void
}
export default function EventSection({events, newEvent, setNewEvent, addEvent}: EventsProps) {
    return (
        <div>
             {/* Event Section */}
        <section className="bg-gray shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Event Management</h2>

            {/* Add Event Form */}
            <div className="grid md:grid-col-2 gap-4 mb-6">
                <input 
                type="text"
                placeholder="Event Name"
                className="border p-2 rounded"
                value={newEvent.name}
                onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                  />
                  <input 
                  type="date"
                  className="border p-2 rounded"
                  value={newEvent.date}
                  onChange={(e)=> setNewEvent({...newEvent, date: e.target.value})}
                    />
                 <input 
                  type="time"
                  className="border p-2 rounded"
                  value={newEvent.time}
                  onChange={(e)=> setNewEvent({...newEvent, time: e.target.value})}
                    />
                  <input 
                  type="text"
                  placeholder="Fees"
                  className="border p-2 rounded"
                  value={newEvent.fee}
                  onChange={(e)=> setNewEvent({...newEvent, fee: e.target.value})}
                    />
                  <input 
                  type="text"
                  className="border p-2 rounded col-span-2"
                  value={newEvent.location}
                  onChange={(e)=> setNewEvent({...newEvent, location: e.target.value})}
                    />
                    <textarea
                    placeholder="Description"
                    className="border p-2 rounded col-span-2"
                    value={newEvent.description}
                    onChange={(e)=> setNewEvent({...newEvent, description: e.target.value})}
                    />
            </div>
            <button
            onClick={addEvent}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Event</button>

            {/* Event list */}
            <ul className="mt-6 grid md:grid-cols-2 gap-4">
                {events.map((event)=> (
                    <li key={event.id} className="border p-2 rounded-lg bg-dark-300">
                        <h3 className="font-bold text-lg">{event.name}</h3>
                        <p>{event.date} at {event.time}</p>
                        <p>{event.location}</p>
                        <p className="text-sm text-gray-600">{event.description}</p>
                        <p className="font-semibold mt-1">Fees: {event.fee}</p>
                    </li>
                ))}
            </ul>
        </section>
        </div>
    )
}