import { Timestamp } from "firebase/firestore";



/* export type UserRole = "user" | "owner";

export interface AppUser {
    uid: string;
    email: string;
    name?: string;
    role: UserRole;
    createdAt?: string | Date | Timestamp;
}  */

export type MediaItem = {
    id?: string;
    type: "image" | "video";
    url: string;
    alt: string;
    createdAt?: string | Date | Timestamp;
}

export type EventItem = {
    id?: string;
    name: string;
    description?: string;
    date?: string;
    time?: string;
    fee?: number;
    location?:string;
    poster?: MediaItem | null;
    gallery?: MediaItem[];
    capacity?: number;
}

export type FeedPost = {
    id?: string;
    caption?: string;
    media: MediaItem[];
    createdAt: string;
}

export type Booking = {
    id?: string;
    eventId: string;
    guestName: string;
    email?: string;
    status: 'pending' | 'accepted' | 'rejected' | 'checked in';
    createdAt: string;
}

/* export interface MusicTrack {
    id?: string;
    title: string;
    artist: string;
    url: string;
    owrnerId: string;
    createdAt: string | Date | Timestamp;
} */