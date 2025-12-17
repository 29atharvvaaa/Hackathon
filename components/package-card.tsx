"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, Star, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PackageCardProps {
  id: number
  name: string
  description: string
  image: string
  price: number
  duration: string
  rating: number
  highlights: string[]
  featured?: boolean
}

export function PackageCard({
  id,
  name,
  description,
  image,
  price,
  duration,
  rating,
  highlights,
  featured,
}: PackageCardProps) {
  return (
    <Card
      className={`group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${featured ? "ring-2 ring-primary" : ""}`}
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {featured && <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Featured</Badge>}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="flex items-center gap-1 text-sm font-medium">
            <Star className="h-4 w-4 fill-accent text-accent" />
            {rating}
          </span>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {duration}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">From</span>
            <p className="text-2xl font-bold text-primary">${price.toLocaleString()}</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <div className="space-y-2 mb-4">
          {highlights.slice(0, 3).map((highlight) => (
            <div key={highlight} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
        <Button asChild className="w-full">
          <Link href={`/packages/${id}`}>View Package</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
