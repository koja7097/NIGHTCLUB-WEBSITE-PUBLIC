"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  title?: string
}

export function ImageGallery({ images, title = "Gallery" }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the atmosphere and energy of our premium venues
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Dialog key={image.id} open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <div
                  className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
                  onClick={() => {
                    setSelectedImage(index)
                    setIsOpen(true)
                  }}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-4xl w-full p-0 bg-black/90 border-none">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <div className="relative aspect-video">
                    <Image
                      src={images[selectedImage].src || "/placeholder.svg"}
                      alt={images[selectedImage].alt}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>

                  {images[selectedImage].title && (
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <h3 className="text-white text-lg font-semibold">{images[selectedImage].title}</h3>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}
