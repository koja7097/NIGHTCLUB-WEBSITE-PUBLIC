"use client"

import React from "react";
import { Calendar, Newspaper, ListCheck, TrendingUp, Beer, MessageSquare, Mic2 , Upload} from "lucide-react";

type SideSectionProps = {
    activeTap: string
    setActiveTap: (tap: string) => void
}
export default function SideSection({activeTap, setActiveTap}: SideSectionProps) {
    const tabs = [
        {id: "overview", label: "Overview", icon: <TrendingUp size={22}/>},
        {id: "events", label: "Events", icon: <Calendar size={22}/>},
        {id: "feed", label: "Feed", icon: <Newspaper size={22}/>},
        {id: "booking", label: "Booking", icon: <ListCheck size={22}/>},
        {id: "barMenu", label: "BarMenu", icon: <Beer size={22}/>},
        {id: "guestSection", label: "Guest Section", icon: <MessageSquare size={22}/>},
        {id: "dj", label: "DJ", icon: <Mic2 size={22}/>},
        {id: "media", label: "Media Gallery", icon: <Upload size={22}/>},

    ]
    return (
        <aside className="w-64 flex-col bg-white-900 text-dark p-6 space-y-4">
            <h2 className="text-xl font-bold mb-6 ">Dashbaord Menu</h2>
            <nav className="space-y-4 flex flex-col  h-full ">
                {tabs.map((tab)=> (
                    <button
                    key={tab.id}
                    onClick={()=> setActiveTap(tab.id)}
                    className={`flex md:flex-row flex-col item-center md:item-start md:sppace-x-2 p-1 hover:color-blue-600  ${activeTap} `}
                    >
                   {/* icon visibility */}  
                  <div className="flex-shrink-0"> {tab.icon}  </div>
                   {/* label */} 
                   <span className="hidden md:inline ml-3">{tab.label}</span>
                </button>
                ))}
            </nav>
        </aside>
    )
}