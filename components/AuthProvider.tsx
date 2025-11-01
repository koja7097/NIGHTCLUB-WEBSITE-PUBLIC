"use client";

import React from 'react';
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  firstName: string;
  lastName: string;
  dob: string;
  contact: string;
  email: string;
  password: string;
} | null;

interface AuthContextProps {
  user: User;
  signUp: (data: NonNullable<User>) => void;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const signUp = (data: NonNullable<User>) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const signIn = (email: string, password: string) => {
    const stored = localStorage.getItem("user");
    if (!stored) return false;
    const parsed: NonNullable<User> = JSON.parse(stored);
    if (parsed.email === email && parsed.password === password) {
      setUser(parsed);
      return true;
    }
    return false;
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAut = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};