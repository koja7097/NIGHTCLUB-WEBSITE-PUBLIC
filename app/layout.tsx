import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "THE NIGHT CREW - Premium Nightclub Booking",
  description:
    "Experience the ultimate nightlife with THE NIGHT CREW. Book exclusive access to the hottest clubs, events, and VIP experiences in the city.",
  generator: "v0.app",
  keywords: [
    "nightclub",
    "booking",
    "nightlife",
    "events",
    "party",
    "clubs",
    "VIP",
    "exclusive",
    "DJ",
    "entertainment",
  ],
  authors: [{ name: "THE NIGHT CREW" }],
  openGraph: {
    title: "THE NIGHT CREW - Premium Nightclub Booking",
    description: "Experience the ultimate nightlife. Book exclusive access to the hottest clubs and VIP experiences.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
        <Suspense
          fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="animate-pulse-glow text-primary text-2xl font-bold">THE NIGHT CREW</div>
            </div>
          }
        >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
