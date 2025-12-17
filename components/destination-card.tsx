"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DestinationCardProps {
  id: number
  name: string
  description: string
  image: string
  price: number
  duration: string
  rating: number
  category: string
}

export function DestinationCard({
  id,
  name,
  description,
  image,
  price,
  duration,
  rating,
  category,
}: DestinationCardProps) {
  return (
    <Link href={`/destinations/${id}`}>
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <Badge className="absolute top-4 left-4 capitalize">{category}</Badge>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <div className="flex items-center gap-1 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{name.split(",")[1]?.trim() || "Destination"}</span>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {duration}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {rating}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground">From</span>
              <p className="text-lg font-bold text-primary">${price.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
