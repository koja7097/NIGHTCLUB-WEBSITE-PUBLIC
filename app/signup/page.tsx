"use client";

import React from 'react'
import { useAut } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SignUpForm = {
  firstName: string;
  lastName: string;
  dob: string;
  contact: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const { signUp } = useAut();
  const router = useRouter();

  const [form, setForm] = useState<SignUpForm>({
    firstName: "",
    lastName: "",
    dob: "",
    contact: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     if(!agreed) {
        alert("please agree to Terms and Condition before Signing Up ");
        return;
    }
    // calculate age
   const birthDate = new Date(form.dob);
   const today = new Date();
   const age = today.getFullYear() - birthDate.getFullYear();
   const monthDiff = today.getMonth() - birthDate.getMonth();

  // adjust if the birthday hasnt occured yetthis year
   const actualAge =
   monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
   ? age - 1 : age;

   if(actualAge < 18 ) {
    setError("You must be atleast 18 years old to sign up");
    return; 
   }


    signUp(form);
    router.push("/events");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-white mb-3">Create Account</h1>
        <p className="text-gray-400 text-center mb-8">Join <span className="text-purple-400 font-semibold">THE NIGHT CREW</span> and unlock exclusive access 🌃</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {(Object.keys(form) as (keyof SignUpForm)[]).map((field) => (
            <input
              key={field}
              type={
                field === "password"
                  ? "password"
                  : field === "dob"
                  ? "date"
                  : field === "email"
                  ? "email"
                  : "text"
              }
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              className="p-3 rounded-lg bg-black/40 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
              required
            />
          ))}

          {/* Terms and Condition Checkbox*/}
          <label className='flex items-start gap-3 mt-2 text-sm text-gray-300 cursor-pointer select-none'>
            <input type="checkbox" 
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className='mt-1 accent-purple-500 w-4 h-4'
            required
            />
            <span>
                I agree to the {""}
                <a href="/term"
                target='_blank'
                rel='noopener noreferrer'
                className='text-purple-400 hover:text-pink-400 underline'
                >Terms & Conditions</a>{""}
                and Privacy Policy.
            </span>
          </label>

          {error && (
            <p className="text-red-500 text-sm text-center -mt-2">{error}</p>
          )}
          
          <button className={`mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition
        ${agreed ? "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:opacity-90" : "bg-gray-600 cursor-not-allowed"}
        `}
        disabled={!agreed}
        >
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/signin")}
            className="text-purple-400 hover:text-pink-400 font-medium cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}