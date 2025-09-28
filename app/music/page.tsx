import React from "react"
import { Navigation } from "@/components/navigation"
export default function MusicPage() {
    return (
         <main>
            <Navigation/>
            <div>
                 <h1 className="text-center text-muted mt-5">Welcome to NightCrew Music page</h1>
                <p className="text-muted text-center mt-3">Bar page now shows</p>
            </div>
            </main>
    )
}