import {useEffect, useState} from "react";

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=> {
        const auth = localStorage.getItem("nightcrew_auth");
        setIsAuthenticated(auth === "true");
    }, [])

    const login = (email: string, password: string) => {
       const adminEmail = "admin@nightcrew.com";
       const adminPassword = "Admin123";

       if(email === adminEmail && password === adminPassword) {
        localStorage.setItem("nightcrew_auth", "true");
        setIsAuthenticated(true);
        return {success:true};
       }
       return {success: false, message: "Invalid Admin credentials"};
    };

    const logout = () => {
        localStorage.removeItem("nightcrew_auth");
        setIsAuthenticated(false)
    };
    return {isAuthenticated, login, logout};
}