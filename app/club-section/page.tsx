import React from 'react';
import { Navigation } from "@/components/navigation"
import ClubDetails from '@/components/ClubDetails';
import ProtectedRoute from "@/components/ProtectedRoutes"

export default function ClubSection() {
    return (
        <ProtectedRoute>
        <>
        <Navigation/>
        <div>
            <ClubDetails/>
        </div>
        </>
        </ProtectedRoute>
    )
}
