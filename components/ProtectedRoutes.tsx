"use client";

import React from "react";
import { useAut } from "./AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAut();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/signup");
  }, [user, router]);

  if (!user) return null;

  return <>{children}</>;
}