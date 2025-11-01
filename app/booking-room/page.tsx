"use client";
import React from "react";
import { useState } from "react";
import { Calendar, Clock, User, Mail, MessageSquare, IdCard, CheckCircle } from "lucide-react";


const STORAGE_KEY = "nightcrew_bookings";
export default function BookingRoomPage() {
  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    eventId: "",
    date: "",
    time: "",
    guest: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value } = e.target;
    setFormData((prev)=> ({...prev, [name]: value}));
  };

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true);

  /*   const stored = localStorage.getItem(STORAGE_KEY);
   const existing = stored ? JSON.parse(stored) : []; */

    const newBooking = {
     id: crypto.randomUUID(),
     guestName: formData.guestName,
     email: formData.email,
     date: formData.date,
     time: formData.time,
     guest: formData.guest,
     notes: formData.notes,
     eventId: formData.eventId,
     status: "pending",  
      };

    // Get existing bookings from LocalStorage
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    const updated = [...existing, newBooking];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    console.log("New booking Saved", newBooking);
     
    window.dispatchEvent(new Event("booking_updated"));
  } catch (err) {
    console.error("error Saving Bookings", err)
  }
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ guestName: "", email: "", eventId: "",  date: "", time: "", guest: "",  notes: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <div className="max-w-lg w-full bg-gray-900/70 p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-800">
        <h1 className="text-3xl font-bold mb-2 text-center text-pink-500">Book Your Room</h1>
        <p className="text-gray-400 text-center mb-8">
          Reserve your spot for the next big night — fill in the details below.
        </p>

        {submitted ? (
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h2 className="text-xl font-semibold mb-2">Booking Successful!</h2>
            <p className="text-gray-400">We’ve received your booking request.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-500 w-5 h-5" />
              <input
                type="text"
                name="guestName"
                placeholder="Full Name"
                value={formData.guestName}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-white pl-10 pr-3 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition"
              />
            </div>

            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-500 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-white pl-10 pr-3 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition"
              />
            </div>

               <div className="relative">
              <IdCard className="absolute top-3 left-3 text-gray-500 w-5 h-5" />
              <input
                type="text"
                name="eventId"
                placeholder="Event Name"
                value={formData.eventId}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-white pl-10 pr-3 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Calendar className="absolute top-3 left-3 text-gray-500 w-5 h-5" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 text-white pl-10 pr-3 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition"
                />
              </div>

              <div className="relative">
                <Clock className="absolute top-3 left-3 text-gray-500 w-5 h-5" />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 text-white pl-10 pr-3 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition"
                />
              </div>
            </div>

            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-500 w-5 h-5" />
              <input
                type="number"
                name="guest"
                placeholder="Number of Guests"
                value={formData.guest}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-white pl-10 pr-3 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition"
              />
            </div>

            <div className="relative">
              <MessageSquare className="absolute top-3 left-3 text-gray-500 w-5 h-5" />
              <textarea
                name="notes"
                placeholder="Additional Notes (optional)"
                value={formData.notes}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white pl-10 pr-3 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition"
                rows={3}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Submitting..." : "Submit Booking"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}