"use client"
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import  {useRouter} from "next/navigation";

export default function RequiredRole({role, children} : {
role: string, children: React.ReactNode }) {
    const {user, profile, loading} = useAuth();
    const router = useRouter();
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        if(loading) return;
        if(!user) {
            router.push("/login");
            return;
        }
        if(profile?.role === role) {
            setAllowed(true);
        } else {
            router.push("/");
        }
    }, [user, profile, loading, router, role]);

    if(loading) return <p>Loading...</p>;
    return allowed ? <>{children}</> : null;
}

