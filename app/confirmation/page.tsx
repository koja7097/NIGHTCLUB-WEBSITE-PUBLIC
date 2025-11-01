
"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react"

export default function PaymentConfirmation() {
  const router = useRouter();
  const params = useParams< {id: string }>();
  const id = params?.id;


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 text-gray-800 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <CheckCircle className="text-green-500 text-7xl mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order Confirmed 🎉</h1>
        <p className="text-gray-600 text-center mb-8">
          Your payment was successful. Your booking is now being processed.
          <span className="font-semibold">#{id}</span>
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/club-section")}
          className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all"
        >
          Go Back Home
        </motion.button>
      </motion.div>
    </div>
  );
}