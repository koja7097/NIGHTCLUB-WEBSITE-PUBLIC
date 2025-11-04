"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, Search, LogIn } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter, usePathname } from "next/navigation"
import { useAut } from "./AuthProvider"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { signOut, user } = useAut()

  const handleSignOut = () => {
    signOut()
    router.push("/signup")
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  const handleLogout = () => {
    logout()
    router.push("/admin-log")
  }
  const isDashboardPage = pathname?.startsWith("/dashboard")

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-lg md:text-xl font-semibold text-foreground group-hover:opacity-80 transition-opacity duration-300 tracking-wider">
              THE NIGHT CREW
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {[
              { href: "/", label: "HOME" },
              { href: "/music", label: "MUSIC" },
              { href: "/events", label: "EVENTS" },
              { href: "/bar", label: "BAR" },
              { href: "/club-section", label: "CLUB SECTION" },
              { href: "/night-crew", label: "NIGHT CREW" },
              { href: "/gallery", label: "GALLERY" },
              { href: "/contact", label: "CONTACT" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium uppercase tracking-wide text-foreground hover:text-muted-foreground border-b-2 border-transparent hover:border-pink-300 transition duration-300"
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated && !isDashboardPage && (
              <Link
                href="/dashboard"
                className="text-sm font-medium uppercase tracking-wide text-foreground hover:text-muted-foreground border-b-2 border-transparent hover:border-pink-300 transition duration-300"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="text-xs font-medium text-gray-400">
                  Hi, {user?.firstName}
                </span>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs text-white"
                >
                  SignOut
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-40 bg-card border-border focus:border-foreground text-sm"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSearch}
                    className="hover:bg-muted"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSearch}
                  className="hover:bg-muted"
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {!isDashboardPage && (
              <div>
                {isAuthenticated ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="hover:bg-muted text-red-400 text-xs"
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/admin-log">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-muted flex items-center gap-1 text-xs"
                    >
                      <LogIn className="h-4 w-4" />
                      <span className="hidden md:inline">Admin Log</span>
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="hover:bg-muted"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              <div className="mb-3">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background border-border"
                />
              </div>
              {[
                "HOME",
                "MUSIC",
                "EVENTS",
                "BAR",
                "CLUB SECTION",
                "NIGHT CREW",
                "GALLERY",
                "ADMIN-LOG",
              ].map((label, i) => (
                <Link
                  key={i}
                  href={`/${label.toLowerCase().replace(" ", "-")}`}
                  className="block px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors font-medium uppercase tracking-wide"
                  onClick={toggleMenu}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}