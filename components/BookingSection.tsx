import React from "react";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";
import jsPDF from "jspdf";
import { Booking } from "@/lib/mockData";

type BookingProps = {
    booking: Booking[]
}

export default function BookingSection({booking}: BookingProps){
// Eport Guest List
const exportGuestList = (type: "pdf" | "excel") => {
    if(type === "excel") {
        const ws = XLSX.utils.json_to_sheet(booking)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "GuestList")
        const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"})
        const blob = new Blob([excelBuffer], {type: "application/octet-stream"})
        saveAs(blob, "guest-list.xlsx")
    }else {
        const doc = new jsPDF()
        doc.text("Guest List", 10, 10)
        booking.forEach((b,i)=> {
            doc.text(
                `${i + 1}. ${b.guestName} - ${b.eventId} ${b.status}`,
                10,
                20 + i * 10
            )
        })
        doc.save("guest-list.pdf")
    }
}
//
return (
      <div>
        {/* Booking Section */}
        <section className="bg-dark shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Booking Management</h2>
        </section>
        {/* Export Button */}
     <div className=" flex mb-4  gap-4 ">
     <button
     onClick={() => exportGuestList("pdf")}
     className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600"
     >
     Export PDF
     </button>
         <button
     onClick={() => exportGuestList("excel")}
     className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600"
     >
     Export Excel
     </button>
     </div>
     {/* Booking Table */}
     <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
            <thead>
                <tr className="bg-dark-200 text-left">
                    <th className="border p-2">Guest</th>
                       <th className="border p-2">Event</th>
                          <th className="border p-2">Status</th>
                </tr>
            </thead>
            <tbody>
                {booking.map((bookings)=> (
                    <tr key={bookings.id} className="hover: bg-dark-100">
                        <td className="border p2">{bookings.guestName}</td>
                           <td className="border p2">{bookings.eventId}</td>
                              <td className="border p2">{bookings.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
     </div>
     </div>
)

}