"use client";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { Booking, mockBooking } from "@/lib/mockData";

const STORAGE_KEY = "nightcrew_bookings"

export default function BookingSection() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const loadBookings = () => {
        try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored !== "[]") {
        const parsed = JSON.parse(stored)
        console.log("loaded Bookings from Localstorage")
        setBookings(parsed);
     
     }else {
        console.log("No existing booking found. loading mockdata");
        setBookings(mockBooking);
        if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockBooking));
     }
     }
    } catch (err) {
      console.error("Error  parsing stored bookings from LocalStorage", err);
      setBookings(mockBooking)
     }
};

loadBookings();

window.addEventListener("booking_updated", loadBookings);

window.addEventListener("storage", loadBookings);

return () =>{
     window.removeEventListener("booking_updated", loadBookings);
      window.removeEventListener("storage", loadBookings);
};
  }, []);

  // Save to LocalStorage whenever bookings change


  const handleDelete = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
  };

  //reset
  const handleReset = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockBooking));
    setBookings(mockBooking);
    console.log("reset booking to mock data.")
  };

  const exportGuestList = (type: "pdf" | "excel") => {
    if (bookings.length === 0) return alert("no booking to export");

    if (type === "excel") {
      const ws = XLSX.utils.json_to_sheet(bookings);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "GuestList");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, "nightcrew-booking.xlsx");
    } else {
      const doc = new jsPDF();
      doc.text("Guest List", 10, 10);
      bookings.forEach((b, i) => {
        doc.text(
          `${i + 1}. ${b.guestName}(${b.email}) - ${b.eventId} - ${b.date} ${b.time} ${b.notes} - ${b.status}`,
          10,
          20 + i * 10
        );
      });
      doc.save("nightcrew-booking.pdf");
    }
  };

  return (
    <div>
      <section className="bg-gray-900 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-white">Booking Management</h2>

        <div className="flex mb-4 gap-4">
          <button
            onClick={() => exportGuestList("pdf")}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Export PDF
          </button>
          <button
            onClick={() => exportGuestList("excel")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Export Excel
          </button>
          <button
          onClick={handleReset}
         className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
         >Reset Bookings</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-white">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="border p-2">Guest</th>
                <th className="border p-2">Email</th>
                 <th className="border p-2">Event</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Guests</th>
                 <th className="border p-2">Notes</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-800">
                    <td className="border p-2">{b.guestName}</td>
                    <td className="border p-2">{b.email}</td>
                     <td className="border p-2">{b.eventId}</td>
                    <td className="border p-2">{b.date}</td>
                    <td className="border p-2">{b.time}</td>
                    <td className="border p-2">{b.guest}</td>
                    <td className="border p-2">{b.notes}</td>
                    <td className="border p-2">{b.status}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="text-red-400 hover:text-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center text-gray-400 py-4">
                    No bookings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}