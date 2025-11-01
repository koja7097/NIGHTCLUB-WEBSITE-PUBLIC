"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { clubsDatas } from "@/src/ClubData/clubsDatas";
import { motion } from "framer-motion";
import { CreditCard, Wallet, Apple, Banknote, Loader2 } from "lucide-react";

type Club = {
     id: string;
    name: string;
    location: string;
    timing: string;
    avgCost: string;
    hightlights? : string;
    notes: string;
}

export default function ClubPaymentPage() {
  const params = useParams<{id: string}>();
  const  id  = params?.id;
  const router = useRouter();
  const [club, setClub] = useState<Club | null>(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const foundClub = clubsDatas.find((c) => c.id === id);
    setClub(foundClub || null);
  }, [id]);

 /*  const handlePlaceOrder = () => {
    router.push(`/payment/${id}/confirmation`);
  }; */

  const handlePayment = () => {
    if (!club) return;

    const clubCost = Number(club.avgCost.replace(/\D/g, ""));
    const enteredAmount = Number(amount.replace(/\D/g, ""));

    if (enteredAmount !== clubCost) {
      setError(`Amount must match the exact cost ₹${clubCost}`);
      return;
    }

    setError("");
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      router.push(`/confirmation`);
    }, 2500);
  };

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">
        Loading club details...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white text-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8"
      >
        <h2 className="text-center text-2xl font-bold mb-6">Checkout</h2>

        {/* Club Info */}
        <div className="bg-gray-100 rounded-2xl p-4 mb-6 text-sm">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">{club.name}</h3>
          <p className="text-gray-600"><span className="font-medium">Location:</span> {club.location}</p>
          <p className="text-gray-600"><span className="font-medium">Timing:</span> {club.timing}</p>
          <p className="text-gray-600"><span className="font-medium">Highlights:</span> {club.hightlights || "N/A"}</p>
          <p className="text-gray-900 font-semibold mt-2">Avg Cost: {club.avgCost}</p>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <p className="font-semibold mb-3">Payment Method</p>
          <div className="flex justify-between items-center gap-3">
            <CreditCard className="text-4xl text-[#EB001B]" />
            <Wallet className="text-4xl text-[#1A1F71]" />
            <Apple className="text-4xl text-[#003087]" />
            <Banknote className="text-4xl text-black" />
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Enter Payment Amount (₹)
          </label>
          <input
            type="number"
            placeholder="Enter amount..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Summary */}
        <div className="flex justify-between text-gray-700 text-sm mb-3">
          <span>Subtotal</span>
          <span>{club.avgCost}</span>
        </div>
        <div className="flex justify-between text-gray-700 text-sm mb-3">
          <span>Service Fee</span>
          <span>₹100</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900 text-lg mb-6">
          <span>Total</span>
          <span>
            ₹
            {(
              (Number(club.avgCost.replace(/\D/g, "")) || 0) + 100
            ).toLocaleString()}
          </span>
        </div>

        {/* Buttons */}
        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <Loader2 className="animate-spin text-white text-lg" />
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>

        <button
          onClick={() => router.back()}
          disabled={processing}
          className="w-full mt-3 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
        >
          Go Back
        </button>
      </motion.div>
    </div>
  );
}