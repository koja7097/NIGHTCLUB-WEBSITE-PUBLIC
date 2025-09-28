import React from "react"
// ADDED THE BAR PAGE TO STOP THE 404 RETURNS
import { Navigation } from "@/components/navigation"
export default function BarPage() {
    return (
         <main>
            <Navigation/>
        <div>
             <h1 className="text-center text-muted mt-5">Welcome to NightCrew Bar page</h1>
            <p className="text-muted text-center mt-3">Bar page now shows</p>
        </div>
        </main>
    )
}