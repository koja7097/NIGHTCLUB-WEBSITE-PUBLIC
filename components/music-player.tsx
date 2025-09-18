"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"

const playlist = [
  {
    id: 1,
    title: "Electric Nights",
    artist: "DJ NEXUS",
    duration: "4:32",
    src: "/placeholder-audio.mp3",
  },
  {
    id: 2,
    title: "Neon Dreams",
    artist: "LUNA BEATS",
    duration: "3:45",
    src: "/placeholder-audio.mp3",
  },
  {
    id: 3,
    title: "Bass Drop",
    artist: "BASS KING",
    duration: "5:12",
    src: "/placeholder-audio.mp3",
  },
  {
    id: 4,
    title: "Sunset Vibes",
    artist: "SUNSET VIBES",
    duration: "4:18",
    src: "/placeholder-audio.mp3",
  },
]

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [currentTrack])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length)
    setIsPlaying(false)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length)
    setIsPlaying(false)
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = value[0]
    setVolume(newVolume)
    audio.volume = newVolume / 100
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume / 100
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const track = playlist[currentTrack]

  return (
    <Card className="fixed bottom-6 left-6 z-40 w-80 glass-effect neon-border">
      <CardContent className="p-4">
        <audio ref={audioRef} src={track.src} onEnded={nextTrack} />

        <div className="space-y-4">
          {/* Track Info */}
          <div className="text-center">
            <h4 className="font-bold text-primary">{track.title}</h4>
            <p className="text-sm text-muted-foreground">{track.artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button variant="ghost" size="sm" onClick={prevTrack} className="hover:text-primary">
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              onClick={togglePlay}
              className="bg-primary hover:bg-secondary text-primary-foreground w-10 h-10 rounded-full"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <Button variant="ghost" size="sm" onClick={nextTrack} className="hover:text-primary">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleMute} className="hover:text-primary">
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="flex-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
