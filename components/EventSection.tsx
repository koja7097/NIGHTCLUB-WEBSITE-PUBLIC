"use client"

import React, { useState, useEffect } from "react";
import { EventItem } from "@/lib/mockData";
import { Button } from "@/components/ui/button";


type EventsProps = {
    onEventsUpdate?: (events:EventItem[]) => void;
}  


export default function EventSection({onEventsUpdate}: EventsProps) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [newEvent, setNewEvent] = useState<EventItem>({
    id: "",
    name: "",
    image: "",
    category: "",
    location: "",
    date: "",
    time: "",
    fee: "",
    description: "",
    featured: false,
  });

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("events");
    if (stored) {
      const parsed = JSON.parse(stored) as EventItem[];
      setEvents(parsed);
      onEventsUpdate?.(parsed);
    }
  }, []);

  // ✅ Save to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
    onEventsUpdate?.(events);
  }, [events]);

  // ✅ Add new event
  const addEvent = () => {
    if (!newEvent.name || !newEvent.date || !newEvent.category) {
      alert("Please fill all required fields!");
      return;
    }

    const eventToAdd = { ...newEvent, id: crypto.randomUUID() };
    const updated = [...events, eventToAdd];
    setEvents(updated);
    setNewEvent({
      id: "",
      name: "",
      image: "",
      category: "",
      location: "",
      date: "",
      time: "",
      fee: "",
      description: "",
      featured: false,
    });
  };

  return (
    <section className="bg-dark text-white shadow-md rounded-xl p-6 mb-10">
      <h2 className="text-2xl font-semibold mb-4">Event Management</h2>

      {/* Add Event Form */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Event Name"
          className="border p-2 rounded"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          className="border p-2 rounded"
          value={newEvent.category}
          onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 rounded"
          value={newEvent.image}
          onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <input
          type="time"
          className="border p-2 rounded"
          value={newEvent.time}
          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          className="border p-2 rounded"
          value={newEvent.fee}
          onChange={(e) => setNewEvent({ ...newEvent, fee: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded col-span-2"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <label className="flex items-center gap-2 col-span-2">
          <input
            type="checkbox"
            checked={newEvent.featured}
            onChange={(e) => setNewEvent({ ...newEvent, featured: e.target.checked })}
          />
          <span>Mark as Featured</span>
        </label>
      </div>

      <Button onClick={addEvent} className="bg-blue-600 text-white">
        Add Event
      </Button>

      {/* Events List */}
      <ul className="mt-6  grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <li key={event.id} className="border rounded-lg shadow bg-gray-400">
            {event.image && (
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
            )}
            <div className="p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                  {event.category}
                </span>
                {event.featured && (
                  <span className="text-yellow-500 font-semibold">⭐ Featured</span>
                )}
              </div>
              <h3 className="font-bold text-lg">{event.name}</h3>
              <p className="text-sm text-gray-600">{event.location}</p>
              <p className="text-sm text-gray-600">
                {event.date} • {event.time}
              </p>
              <p className="text-blue-600 font-semibold mt-1">{event.fee}</p>
              <p className="text-gray-500 text-sm mt-1">{event.description}</p>
              <div className="text-right mt-3">
                <Button className="bg-blue-500 text-white hover:bg-blue-700">
                  Get Tickets
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}