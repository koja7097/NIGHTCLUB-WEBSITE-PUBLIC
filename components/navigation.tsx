"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, Search } from "lucide-react"


export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

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
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
