"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react"

interface Track {
  id: string
  title: string
  artist: string
  duration: string
  genre: string
}

const tracks: Track[] = [
  { id: "1", title: "Electric Nights", artist: "DJ Neon", duration: "3:45", genre: "Electronic" },
  { id: "2", title: "Bass Drop", artist: "Club Master", duration: "4:12", genre: "House" },
  { id: "3", title: "Midnight Vibes", artist: "Night Owl", duration: "3:28", genre: "Techno" },
  { id: "4", title: "Party Anthem", artist: "Beat King", duration: "4:01", genre: "EDM" },
]

export function InteractiveMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5))
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    setProgress(0)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setProgress(0)
  }

  const currentSong = tracks[currentTrack]

  return (
    <section className="py-16 bg-gradient-to-br from-background via-card/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 neon-pink">Feel the Beat</h2>
          <p className="text-xl text-muted-foreground">Experience our signature sound before you arrive</p>
        </div>

        <Card className="max-w-2xl mx-auto glass-effect neon-border animate-glow-pulse">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-nightclub flex items-center justify-center animate-float">
                <div className="w-24 h-24 rounded-full bg-background/80 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary animate-pulse-glow" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">{currentSong.title}</h3>
              <p className="text-lg text-muted-foreground mb-1">{currentSong.artist}</p>
              <p className="text-sm text-accent">
                {currentSong.genre} • {currentSong.duration}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-nightclub h-2 rounded-full transition-all duration-300 animate-pulse-glow"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {Math.floor(progress * 0.04)}:{String(Math.floor((progress * 2.4) % 60)).padStart(2, "0")}
                </span>
                <span>{currentSong.duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="lg"
                onClick={prevTrack}
                className="text-primary hover:text-accent hover:bg-primary/10 transition-all duration-300"
              >
                <SkipBack className="h-6 w-6" />
              </Button>

              <Button
                size="lg"
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-primary hover:bg-accent text-primary-foreground transition-all duration-300 hover:scale-110 animate-pulse-glow"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={nextTrack}
                className="text-primary hover:text-accent hover:bg-primary/10 transition-all duration-300"
              >
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <div className="w-24 bg-muted rounded-full h-1">
                <div className="bg-primary h-1 rounded-full w-3/4" />
              </div>
            </div>

            {/* Track List */}
            <div className="mt-8 space-y-2">
              <h4 className="text-lg font-semibold text-foreground mb-4">Playlist</h4>
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(index)
                    setProgress(0)
                  }}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    index === currentTrack
                      ? "bg-primary/20 border border-primary/50"
                      : "hover:bg-card/50 border border-transparent"
                  }`}
                >
                  <div>
                    <p className={`font-medium ${index === currentTrack ? "text-primary" : "text-foreground"}`}>
                      {track.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{track.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{track.duration}</p>
                    <p className="text-xs text-accent">{track.genre}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
