import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Users } from "lucide-react"

interface ClubCardProps {
  id: string
  name: string
  location: string
  rating: number
  image: string
  price: string
  capacity: number
  openHours: string
  tags: string[]
  featured?: boolean
}

export function ClubCard({
  name,
  location,
  rating,
  image,
  price,
  capacity,
  openHours,
  tags,
  featured = false,
}: ClubCardProps) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${featured ? "ring-2 ring-primary" : ""}`}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {featured && <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">Featured</Badge>}
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-sm font-medium">{rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{name}</h3>
          <span className="text-lg font-bold text-primary">{price}</span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{openHours}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{capacity}+ capacity</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-primary hover:bg-secondary text-primary-foreground">Book Now</Button>
      </CardFooter>
    </Card>
  )
}
