import {useEffect, useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth, db} from "../lib/firebase";
import {doc, getDoc} from "firebase/firestore";

type UserProfile = {
    name: string;
    email: string;
    role: string;
};
export default function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const unsub = onAuthStateChanged(auth, async (u) => {
            setUser(u);
            if(!u) {
                setProfile(null);
                setLoading(false);
                return;
            }

            const docRef = doc(db, "users", u.uid);
            const snap = await getDoc(docRef);
            if(snap.exists()) setProfile(snap.data() as UserProfile);
            setLoading(false);
        });
        return () => unsub();
    }, []);
    return {user, profile, loading}
}