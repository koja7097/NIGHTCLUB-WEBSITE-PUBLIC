"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, MapPin, Users, Play } from "lucide-react"
import { AnimatedCounter } from "./animated-counter"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-primary/20" />
        <div className="absolute inset-0 bg-[url('/vibrant-nightclub-scene-with-neon-lights-and-danci.jpg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Animated particles effect */}
      <div className="absolute inset-0 z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 animate-fade-in">
            <h1 className="hero-text text-primary mb-6 text-glow animate-neon-glow">
              THE<span className="text-secondary">NIGHT</span>
              <br />
              <span className="text-accent">CREW</span>
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1 max-w-32" />
              <div className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="text-primary text-3xl">★</span>
                BOOK THE BEST NIGHTCLUBS
                <span className="text-primary text-3xl">★</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1 max-w-32" />
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground font-semibold">WITH US</p>
          </div>

          <div className="mb-16 animate-fade-in-delay-1">
            <p className="text-xl md:text-2xl text-foreground max-w-4xl mx-auto text-pretty font-medium leading-relaxed">
              Experience the <span className="text-primary font-bold">ultimate nightlife</span> with exclusive access to
              premium clubs,
              <span className="text-secondary font-bold"> VIP tables</span>, and unforgettable events.
              <br className="hidden md:block" />
              Your legendary night starts here.
            </p>
          </div>

          <div className="mb-12 max-w-4xl mx-auto animate-fade-in-delay-2">
            <div className="glass-effect neon-border rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-primary mb-6">Find Your Perfect Night</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                  <Input
                    placeholder="City or Location"
                    className="pl-12 py-4 text-lg bg-card/50 border-primary/30 focus:border-primary focus:ring-primary/50 rounded-xl"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                  <Input
                    type="date"
                    className="pl-12 py-4 text-lg bg-card/50 border-primary/30 focus:border-primary focus:ring-primary/50 rounded-xl"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                  <Input
                    placeholder="Group Size"
                    className="pl-12 py-4 text-lg bg-card/50 border-primary/30 focus:border-primary focus:ring-primary/50 rounded-xl"
                  />
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-secondary text-primary-foreground text-xl py-6 font-bold transition-all duration-300 hover:scale-105 animate-pulse-glow rounded-xl">
                <Search className="mr-3 h-6 w-6" />
                Discover Epic Venues
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 animate-fade-in-delay-3">
            <Button
              size="lg"
              className="bg-primary hover:bg-secondary text-primary-foreground px-10 py-5 text-xl font-bold transition-all duration-300 hover:scale-105 animate-pulse-glow rounded-xl"
            >
              <Play className="mr-2 h-5 w-5" />
              Explore Clubs
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-5 text-xl font-bold transition-all duration-300 hover:scale-105 bg-transparent rounded-xl neon-border"
            >
              View Events
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-delay-4">
            <div className="text-center group">
              <AnimatedCounter
                end={500}
                suffix="+"
                className="text-4xl md:text-5xl font-black text-primary group-hover:text-glow transition-all duration-300"
              />
              <div className="text-lg text-muted-foreground font-semibold mt-2">Premium Clubs</div>
            </div>
            <div className="text-center group">
              <AnimatedCounter
                end={50000}
                suffix="+"
                className="text-4xl md:text-5xl font-black text-primary group-hover:text-glow transition-all duration-300"
              />
              <div className="text-lg text-muted-foreground font-semibold mt-2">Happy Customers</div>
            </div>
            <div className="text-center group">
              <AnimatedCounter
                end={100}
                suffix="+"
                className="text-4xl md:text-5xl font-black text-primary group-hover:text-glow transition-all duration-300"
              />
              <div className="text-lg text-muted-foreground font-semibold mt-2">Cities Worldwide</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2 group-hover:text-glow transition-all duration-300">
                24/7
              </div>
              <div className="text-lg text-muted-foreground font-semibold">Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-primary rounded-full flex justify-center neon-border">
          <div className="w-2 h-4 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
