"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users, CreditCard } from "lucide-react"

export function BookingForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    venue: "",
    date: "",
    time: "",
    guests: "",
    package: "",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  const handleNext = () => setStep(step + 1)
  const handlePrev = () => setStep(step - 1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle booking submission
    console.log("Booking submitted:", formData)
  }

  return (
    <section className="py-16 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-glow">Book Your VIP Experience</h2>
            <p className="text-xl text-muted-foreground">Reserve your table and create unforgettable memories</p>
          </div>

          <Card className="glass-effect neon-border">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">
                {step === 1 && "Select Your Experience"}
                {step === 2 && "Your Details"}
                {step === 3 && "Confirmation"}
              </CardTitle>
              <CardDescription>Step {step} of 3 - Complete your booking in minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="venue" className="text-foreground font-semibold">
                          Select Venue
                        </Label>
                        <Select
                          value={formData.venue}
                          onValueChange={(value) => setFormData({ ...formData, venue: value })}
                        >
                          <SelectTrigger className="bg-card/50 border-primary/30 focus:border-primary">
                            <SelectValue placeholder="Choose a venue" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="skyline">Skyline Rooftop - Manhattan</SelectItem>
                            <SelectItem value="neon">Neon Underground - Miami</SelectItem>
                            <SelectItem value="golden">Golden Gate Club - Las Vegas</SelectItem>
                            <SelectItem value="sunset">Sunset Terrace - Los Angeles</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="date" className="text-foreground font-semibold">
                          Date
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
                          <Input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="pl-10 bg-card/50 border-primary/30 focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="time" className="text-foreground font-semibold">
                          Preferred Time
                        </Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
                          <Select
                            value={formData.time}
                            onValueChange={(value) => setFormData({ ...formData, time: value })}
                          >
                            <SelectTrigger className="pl-10 bg-card/50 border-primary/30 focus:border-primary">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="9pm">9:00 PM</SelectItem>
                              <SelectItem value="10pm">10:00 PM</SelectItem>
                              <SelectItem value="11pm">11:00 PM</SelectItem>
                              <SelectItem value="12am">12:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="guests" className="text-foreground font-semibold">
                          Number of Guests
                        </Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
                          <Select
                            value={formData.guests}
                            onValueChange={(value) => setFormData({ ...formData, guests: value })}
                          >
                            <SelectTrigger className="pl-10 bg-card/50 border-primary/30 focus:border-primary">
                              <SelectValue placeholder="Select guests" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2">2 Guests</SelectItem>
                              <SelectItem value="4">4 Guests</SelectItem>
                              <SelectItem value="6">6 Guests</SelectItem>
                              <SelectItem value="8">8 Guests</SelectItem>
                              <SelectItem value="10+">10+ Guests</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="package" className="text-foreground font-semibold">
                        VIP Package
                      </Label>
                      <Select
                        value={formData.package}
                        onValueChange={(value) => setFormData({ ...formData, package: value })}
                      >
                        <SelectTrigger className="bg-card/50 border-primary/30 focus:border-primary">
                          <SelectValue placeholder="Choose your package" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard Table - $500</SelectItem>
                          <SelectItem value="premium">Premium VIP - $1,000</SelectItem>
                          <SelectItem value="ultimate">Ultimate Experience - $2,500</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-primary hover:bg-secondary text-primary-foreground py-3 text-lg font-bold animate-pulse-glow"
                    >
                      Continue to Details
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-foreground font-semibold">
                          Full Name
                        </Label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter your full name"
                          className="bg-card/50 border-primary/30 focus:border-primary"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-foreground font-semibold">
                          Email Address
                        </Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Enter your email"
                          className="bg-card/50 border-primary/30 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-foreground font-semibold">
                        Phone Number
                      </Label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter your phone number"
                        className="bg-card/50 border-primary/30 focus:border-primary"
                      />
                    </div>

                    <div>
                      <Label htmlFor="requests" className="text-foreground font-semibold">
                        Special Requests
                      </Label>
                      <Textarea
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        placeholder="Any special requests or celebrations?"
                        className="bg-card/50 border-primary/30 focus:border-primary"
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        onClick={handlePrev}
                        variant="outline"
                        className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 bg-primary hover:bg-secondary text-primary-foreground font-bold animate-pulse-glow"
                      >
                        Review Booking
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="bg-card/30 rounded-lg p-6 border border-primary/20">
                      <h3 className="text-xl font-bold text-primary mb-4">Booking Summary</h3>
                      <div className="space-y-2 text-foreground">
                        <p>
                          <strong>Venue:</strong> {formData.venue}
                        </p>
                        <p>
                          <strong>Date:</strong> {formData.date}
                        </p>
                        <p>
                          <strong>Time:</strong> {formData.time}
                        </p>
                        <p>
                          <strong>Guests:</strong> {formData.guests}
                        </p>
                        <p>
                          <strong>Package:</strong> {formData.package}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        onClick={handlePrev}
                        variant="outline"
                        className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-primary hover:bg-secondary text-primary-foreground font-bold animate-pulse-glow"
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Confirm & Pay
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
