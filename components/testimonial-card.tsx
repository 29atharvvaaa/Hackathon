import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
  name: string
  location: string
  text: string
  avatar: string
  trip: string
  rating: number
}

export function TestimonialCard({ name, location, text, avatar, trip, rating }: TestimonialCardProps) {
  return (
    <Card className="border-0 shadow-lg h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <Quote className="h-8 w-8 text-primary/20 mb-4" />
        <p className="text-muted-foreground flex-1 mb-6 leading-relaxed">{text}</p>
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-accent text-accent" />
          ))}
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Image
            src={avatar || "/placeholder.svg"}
            alt={name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{location}</p>
            <p className="text-xs text-primary">{trip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
