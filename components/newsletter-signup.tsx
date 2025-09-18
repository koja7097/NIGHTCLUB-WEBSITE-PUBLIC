"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSpinner } from "./loading-spinner"
import { CheckCircle, Mail, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubscribed(true)
      toast({
        title: "Successfully Subscribed!",
        description: "Welcome to TheNightCrew newsletter.",
      })
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubscribed) {
    return (
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">You're In!</h3>
          <p className="text-muted-foreground">
            Welcome to TheNightCrew newsletter. Get ready for exclusive deals and insider access!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto bg-card/90 backdrop-blur-sm border-primary/20">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Join The VIP List</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Get exclusive access to the hottest venues, early bird pricing, and insider deals. Be the first to know
                about new club openings and special events.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Exclusive Deals</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Early Access</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-primary" />
                  <span>VIP Events</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1"
                  required
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-secondary text-primary-foreground px-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <LoadingSpinner size="sm" /> : "Subscribe"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
