"use client"
import React from "react";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function SpecialLoginPage() {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const allowedPin = "123456";
    const allowedName = "Club Owner";

    const handleLogin = () => {
        if(input === allowedPin || input.toLowerCase() === allowedName.toLowerCase()) {
            //store token to allow dashboard access
            localStorage.setItem("nightcrew_auth", "true");
            router.push("/dashboard");
        } else {
            setError("Access Denied. Wrong Pin or Name.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
            <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-6">The Night Crew Access Portal</h1>
                <input
                 type="text"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 placeholder="Enter Pin or Name"
                 className="w-full p-3 rounded-md border border-gray-700 mb-4 bg-black text-white focus:ring-2 focus:ring-blue-600"
                  />
                  {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
                  <button
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 transition w-full py-3 rounded-lg font-semibold"
                  >Unlock Dashboard</button>
            </div>
        </div>
    )

} 