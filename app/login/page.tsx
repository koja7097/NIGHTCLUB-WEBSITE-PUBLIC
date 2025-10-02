"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const res = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, "users", res.user.uid));

            if(userDoc.exists()) {
                const data = userDoc.data();
                if (data.role === "owner") {
                    router.push("/owner/dashboard");
                } else {
                    router.push("/") //homepage
                }
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            }else {
                alert("Something went wrong");
            }
        }
    };
    return (
        <main className="p-8">
            <h1 className="text-xl font-bold">User Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded"
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
            </form>
        </main>
    )
}