"use client"

import React from "react"
import { useState,} from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, Search, LogIn} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter, usePathname } from "next/navigation"
import {useAut} from "./AuthProvider"


export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const {isAuthenticated, logout} = useAuth();
  const router =useRouter();
  const pathname = usePathname();
  const {signOut, user} = useAut();

  const handleSignOut = () => {
    signOut();
    router.push("/signup")
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

const handleLogout = () => {
  logout();
  router.push("/admin-log")
}
 const isDashboardPage = pathname?.startsWith("/dashboard");

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-2xl md:text-3xl font-bold text-foreground group-hover:opacity-80 transition-opacity duration-300">
              THE NIGHT CREW
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className=" text-foreground hover:text-muted-foreground transition-colors duration-300 font-medium uppercase text-sm tracking-wide
               border-b-2 border-transparent hover:border-pink-300 transition duration-300"
            >
              HOME
            </Link>
            <Link
              href="/music"
              className="text-foreground hover:text-muted-foreground transition-colors duration-300 font-medium uppercase text-sm tracking-wide
                  border-b-2 border-transparent hover:border-pink-300 transition duration-300"
            >
              MUSIC
            </Link>
            <Link
              href="/events"
              className="text-foreground hover:text-muted-foreground transition-colors duration-300 font-medium uppercase text-sm tracking-wide
                  border-b-2 border-transparent hover:border-pink-300 transition duration-300"
            >
              EVENTS
            </Link>
            <Link
              href="/bar"
              className="text-foreground hover:text-muted-foreground transition-colors duration-300 font-medium uppercase text-sm tracking-wide
                  border-b-2 border-transparent hover:border-pink-300 transition duration-300"
            >
              BAR
            </Link>
             <Link
              href="/club-section"
              className="text-foreground hover:text-muted-foreground transition-colors duration-300 font-medium uppercase text-sm tracking-wide
                  border-b-2 border-transparent hover:border-pink-300 transition duration-300"
            >
            Club Section
            </Link>
            <Link
              href="/night-crew"
              className="text-foreground hover:text-muted-foreground transition-colors duration-300 font-medium uppercase text-sm tracking-wide
                  border-b-2 border-transparent hover:border-pink-300 transition duration-300"
            >
              NIGHT CREW
            </Link>
            <Link 
              href="/gallery"
              className="text-foreground hover:text-muted-foreground transition-colors duration-300 font-medium uppercase text-sm tracking-wide
                  border-b-2 border-transparent hover:border-pink-300 transition duration-300"
            >
              GALLERY
            </Link>

          
                <Link 
              href="/contact"
              className="text-foreground hover:text-muted-foreground transition-colors duration-300 font-medium uppercase text-sm tracking-wide
                  border-b-2 border-transparent hover:border-pink-300 transition duration-300"
            >
              CONTACT 
            </Link>

            {/* Only shows dasboard if Logged in */}
            {isAuthenticated && !isDashboardPage &&(
                 <Link
                href="/dashboard"
                className="block px-3 py-3 text-foreground hover:bg-muted transition-colors font-medium uppercase text-sm tracking-wide"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
            <span className="text-sm text-bold text-gray-400">Hi, {user?.firstName}</span>
            <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
              SignOut
            </button>
            </>
            ) : (
              <>
              <Link
              href="/signin"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm transition-all"
              >Sign In</Link>

                 <Link
              href="/signup"
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded text-sm transition-all"
              >Sign Up</Link>
              </>
            )}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-48 bg-card border-border focus:border-foreground"
                    autoFocus
                  />
                  <Button variant="ghost" size="sm" onClick={toggleSearch} className="hover:bg-muted">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm" onClick={toggleSearch} className="hover:bg-muted">
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>
          {!isDashboardPage && (
            <div>
          {/* if logged in show logout */}
          {isAuthenticated ? (
            <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="hover:bg-muted text-red-400"
            >Logout</Button>
          ) : (
          
            <Link href="/admin-log">
            <Button variant="ghost" size="sm" className="hover:bg-muted flex items-center gap-2">
              <LogIn className="h-5 w-5"/>
              <span className="hidden md:inline">Admin Log</span>
            </Button>
            </Link>
          )}
         </div>
          )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu} className="hover:bg-muted">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              <div className="mb-4">
                <Input type="search" placeholder="Search..." className="w-full bg-background border-border" />
              </div>

              <Link
                href="/"
                className="block px-3 py-3 text-foreground hover:bg-muted transition-colors font-medium uppercase text-sm tracking-wide"
                onClick={toggleMenu}
              >
                HOME
              </Link>
              <Link
                href="/music"
                className="block px-3 py-3 text-foreground hover:bg-muted transition-colors font-medium uppercase text-sm tracking-wide"
                onClick={toggleMenu}
              >
                MUSIC
              </Link>
              <Link
                href="/events"
                className="block px-3 py-3 text-foreground hover:bg-muted transition-colors font-medium uppercase text-sm tracking-wide"
                onClick={toggleMenu}
              >
                EVENTS
              </Link>
              <Link
                href="/bar"
                className="block px-3 py-3 text-foreground hover:bg-muted transition-colors font-medium uppercase text-sm tracking-wide"
                onClick={toggleMenu}
              >
                BAR
              </Link>
              <Link
                href="/club-section"
                className="block px-3 py-3 text-foreground hover:bg-muted transition-colors font-medium uppercase text-sm tracking-wide"
                onClick={toggleMenu}
              >
              Club Section
              </Link>
              <Link
                href="/night-crew"
                className="block px-3 py-3 text-foreground hover:bg-muted transition-colors font-medium uppercase text-sm tracking-wide"
                onClick={toggleMenu}
              >
                NIGHT CREW
              </Link>
              <Link
                href="/gallery"
                className="block px-3 py-3 text-foreground hover:bg-muted transition-colors font-medium uppercase text-sm tracking-wide"
                onClick={toggleMenu}
              >
                GALLERY
              </Link>
                <Link
                href="/admin-log"
                className="block px-3 py-3 text-foreground hover:bg-muted transition-colors font-medium uppercase text-sm tracking-wide"
                onClick={toggleMenu}
              >login</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
