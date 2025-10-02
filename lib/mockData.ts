export type MediaItem = {
    id?: string;
    type: "image" | "video";
    url: string;
    alt: string;
    createdAt?: string;
}

export type EventItem = {
    id?: string;
    name: string;
    description?: string;
    date?: string;
    time?: string;
    fee?: string;
    media?: string[];
    location?:string;
    poster?: MediaItem | null;
    gallery?: MediaItem[];
    capacity?: number;
}

export type FeedPost = {
    id?: string;
    caption?: string;
    media: string;
    createdAt: string;
}

export type Booking = {
    id?: string;
    eventId: string;
    guestName: string;
    email?: string;
    status: 'pending' | 'accepted' | 'rejected' | 'checked in';
}

 export const mockEvents: EventItem[] = [
    {
        id: crypto.randomUUID(),
        name: "Summer Party",
        date: "2025-10-05",
        time: "9:00PM",
        description: "Biggest summer party of the year",
        fee: "$20",
        location: 'C club',
        media: ["https://picsum.photos/200/300?random-1"],
    },
     {
        id: crypto.randomUUID(),
        name: "Halloween Bash",
        date: "2025-10-31",
        time: "10:00PM",
        description: "Spomky Vibes & Fun Customes",
        fee: "$30",
        location: 'Ecksee Club',
        media: ["https://picsum.photos/200/300?random-2"],
    },
 ]

 export const mockFeed: FeedPost[] = [
    {
        id: crypto.randomUUID(),
        caption: "DJ dropping Beats",
        media: "/bass-music-festival.jpg",
        createdAt: new Date().toISOString(),
    },
        {
        id: crypto.randomUUID(),
        caption: "Packed dance floor last night",
        media: "/dj-bass-music-dubstep.jpg",
        createdAt: new Date().toISOString(),
    },
 ]

 export const mockBooking: Booking[] = [
 {
 id: crypto.randomUUID(),
 guestName: "Hadshi Raque",
 eventId: "Summer party",
 status: "pending",
 },
 {
 id: crypto.randomUUID(),
 guestName: "Maurine Smith",
 eventId: "Halloween Bash",
 status: "accepted", 
 },
 ]
