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
    image?: string;
    category?: string;
    featured?: boolean;
}

export type FeedPost = {
    id?: string;
    caption?: string;
    media: string;
    createdAt: string;
}

export type Booking = {
    id: string;
    date?:string;
    time?: string;
    guest?:string
    notes?:string;
    eventId?: string;
    guestName: string;
    email?: string;
    status: 'pending' | 'accepted' | 'rejected' | 'check in';
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
        poster: {
            id: crypto.randomUUID(),
            type: "image",
            url: "https://picsum.photos/200/300?random=1",
            alt: "Halloween Bash Poster",
            createdAt: new Date().toISOString(),
        },
    },
     {
        id: crypto.randomUUID(),
        name: "Halloween Bash",
        date: "2025-10-31",
        time: "10:00PM",
        description: "Spomky Vibes & Fun Customes",
        fee: "$30",
        location: 'Ecksee Club',
        media: ["https://picsum.photos/200/300?random=2"],
           poster: {
            id: crypto.randomUUID(),
            type: "image",
            url: "https://picsum.photos/200/300?random=2",
            alt: "Halloween Bash Poster",
            createdAt: new Date().toISOString(),
        },
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
 email: "Hadhi@gmail.com",
 time: "8:00",
 guest: "3",
 notes: "VIP Areas In Front",
  status: "pending",
 },
 {
 id: crypto.randomUUID(),
 guestName: "Maurine Smith",
 eventId: "Halloween Bash",
 email: "rine@gmail.com",
 time: "4:30",
 guest: "20",
 notes: "Get Together",
 status: "accepted", 
 },
 ] 
