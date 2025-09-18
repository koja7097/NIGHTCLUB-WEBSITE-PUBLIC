import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { NewsletterSignup } from "./newsletter-signup"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <NewsletterSignup />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="TheNightCrew Logo" width={40} height={40} className="w-10 h-10" />
              <span className="text-xl font-bold text-primary">THENIGHTCREW</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your premier destination for exclusive nightclub bookings and VIP experiences worldwide.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 hover:text-primary">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button  size="sm" className="p-2 hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:text-primary">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:text-primary">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/clubs" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Browse Clubs
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/booking-policy"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Booking Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Cancellation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@thenightcrew.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Available Worldwide</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="font-medium text-foreground mb-2 text-sm">Business Hours</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>Mon-Fri: 9 AM - 6 PM</p>
                <p>Sat-Sun: 10 AM - 4 PM</p>
                <p className="text-primary font-medium">24/7 Emergency Support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 TheNightCrew. All rights reserved. | Designed for the ultimate nightlife experience.
          </p>
        </div>
      </div>
    </footer>
  )
}
