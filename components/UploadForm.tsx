import React from "react";
import { useState } from "react";
import { db, storage, auth } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BarItem, NightCrewMember, MusicTrack, MediaItem, EventItem } from "@/src/types/type";

interface Props {
    collectionName: string;
    fields?: string[];
}

export default function UploadForm({collectionName} : Props) {
 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
  const [artist, setArtist] = useState(""); // for music
  const [role, setRole] = useState(""); // for Nightcrew
  const [price, setPrice] = useState(""); // for bar
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async ()=> {
    if(!title) return alert("Title required");

    const uid = auth.currentUser?.uid || null;
    if(!uid) return alert("Not Authenticated");

    let fileURL = "";
    if(file) {
        const storageRef = ref(storage, `${collectionName}/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        fileURL = await getDownloadURL(storageRef);
    }

     //Building the doc data depending on collection
     let data: BarItem | NightCrewMember | MusicTrack | MediaItem | EventItem;

     if(collectionName === "bar") {
        data = {
        name: title,
        price,
        description,
        owrnerId: uid,
        createdAt: new Date(),
     };
     } else if (collectionName === "nightcrew") {
      data = {
        name: title,
        role,
        photoUrl: fileURL,
        owrnerId: uid,
        createdAt: new Date(),
    };
     } else if (collectionName === "music") {
     data = {
        title,
        artist,
        url: fileURL,
        owrnerId: uid,
        createdAt: new Date(),
     };

    } else if (collectionName === "events") {
     data = {
        title,
        description,
        date: new Date().toISOString(),
        location: "",
        status: "published",
        owrnerId: uid,
        createdAt: new Date(),
     };
    } else{
        //fallback for events, photos, videos, etc
     const mediaData: MediaItem = {
        type: file?.type.startsWith("video") ? "video" : "phote",
        url: fileURL,
        caption: description,
        ownerId: uid,
        createdAt: new Date(),
     };
     data = mediaData;
    }

    await addDoc(collection(db, collectionName), data);
       /*  title,
        description,
        fileURL,
        ownerId: uid,
        status: collectionName === 'events' || collectionName === 'offers' ? 'published' : 'published',
        createdAt: new Date() */
    setTitle("");
    setDescription("");
    setArtist("");
    setRole("");
    setPrice("");
    setFile(null);
    alert(`${collectionName} uploaded successfully`);
  };
  return (
    <div className="p-4 border rounded">
     <h4>Upload to {collectionName}</h4>
    {/* shared fields */}
    <input 
    placeholder="Title / Name"
    value={title}
    onChange={(e)=> setTitle(e.target.value)}
     />

     {/* special field */}
     {collectionName === "bar" && (
        <>
    <input 
    placeholder="Price"
    value={price}
    onChange={(e)=> setTitle(e.target.value)}
     />
    <input 
    placeholder="Description"
    value={description}
    onChange={(e)=> setDescription(e.target.value)}
     />
    </>
     )}

    {collectionName === "nightcrew" && (
    <>
    <input 
    placeholder="Role"
    value={role}
    onChange={(e)=> setTitle(e.target.value)}
     />
    </>
     )}

    {collectionName === "music" && (
    <>
    <input 
    placeholder="Artist"
    value={artist}
    onChange={(e)=> setTitle(e.target.value)}
     />
     </>
    )}
    
     <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)}/>
     <button onClick={handleUpload}>Upload </button>
    </div>
  )
}