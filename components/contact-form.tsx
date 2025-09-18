"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingSpinner } from "./loading-spinner"
import { CheckCircle, Mail, Phone, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  eventType: string
  groupSize: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    eventType: "",
    groupSize: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const errors: string[] = []

    if (!formData.name.trim()) errors.push("Name is required")
    if (!formData.email.trim()) errors.push("Email is required")
    if (!formData.email.includes("@")) errors.push("Valid email is required")
    if (!formData.subject.trim()) errors.push("Subject is required")
    if (!formData.message.trim()) errors.push("Message is required")

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors = validateForm()
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSubmitted(true)
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent Successfully!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for contacting TheNightCrew. We'll get back to you within 24 hours.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
                eventType: "",
                groupSize: "",
              })
            }}
            variant="outline"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Contact Information */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-1" />
              <div>
  <h4 className="font-medium text-foreground">Email</h4>
  <a
    href="mailto:theightcreww@gmail.com"
    className="text-muted-foreground text-sm hover:underline"
  >
    theightcreww@gmail.com
  </a>
  {/* 
  <a
    href="mailto:vip@thenightcrew.com"
    className="text-muted-foreground text-sm hover:underline"
  >
    vip@thenightcrew.com
  </a> 
  */}
</div>
              
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-1" />
              <div>
  <h4 className="font-medium text-foreground">Phone</h4>
  <a
    href="tel:+919115813846"
    className="text-muted-foreground text-sm hover:underline"
  >
    +91 91158 13846
  </a>
    <p className="text-muted-foreground text-sm">24/7 Support Available</p>
  </div>

            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium text-foreground">Locations</h4>
                <p className="text-muted-foreground text-sm">Available in Chandoighar and Mohali </p>
                <p className="text-muted-foreground text-sm">Premium venues in Chandighar and Mohali</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-foreground mb-2">Business Hours</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Monday - Friday: 9 AM - 6 PM</p>
                <p>Saturday - Sunday: 10 AM - 4 PM</p>
                <p className="text-primary font-medium">24/7 Emergency Support</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">Send us a Message</CardTitle>
            <p className="text-muted-foreground">
              Ready to plan your perfect night? Get in touch with our team for personalized recommendations and
              exclusive deals.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type</Label>
                  <Select value={formData.eventType} onValueChange={(value) => handleInputChange("eventType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="birthday">Birthday Party</SelectItem>
                      <SelectItem value="bachelor">Bachelor/Bachelorette</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="celebration">Celebration</SelectItem>
                      <SelectItem value="casual">Casual Night Out</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groupSize">Group Size</Label>
                  <Select value={formData.groupSize} onValueChange={(value) => handleInputChange("groupSize", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select group size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-5">2-5 people</SelectItem>
                      <SelectItem value="6-10">6-10 people</SelectItem>
                      <SelectItem value="11-20">11-20 people</SelectItem>
                      <SelectItem value="21-50">21-50 people</SelectItem>
                      <SelectItem value="50+">50+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us about your event, preferences, or any special requirements..."
                  rows={5}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-secondary text-primary-foreground py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Sending Message...</span>
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
