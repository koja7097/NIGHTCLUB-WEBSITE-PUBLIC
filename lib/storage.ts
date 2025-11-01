//import {set, get} from "idb-keyval";

export function saveToStorage<T>(key: string, data: T): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

export function loadFromStorage<T>(key: string, fallback: T) : T {
    if (typeof window === "undefined") return fallback;
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
}