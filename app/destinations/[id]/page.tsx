import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, Star, Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { destinations } from "@/lib/data"

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const destination = destinations.find((d) => d.id === Number.parseInt(id))

  if (!destination) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] pt-20">
        <Image src={destination.image || "/placeholder.svg"} alt={destination.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto px-4 lg:px-8">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Destinations
            </Link>
            <Badge className="mb-3 capitalize">{destination.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{destination.name}</h1>
            <div className="flex items-center gap-4 text-white/90">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {destination.duration}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {destination.rating}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">About This Destination</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {destination.description}. Experience the perfect blend of natural beauty, rich culture, and
                unforgettable adventures. Our expert guides will ensure you discover both the iconic landmarks and
                hidden gems that make this destination truly special.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you're seeking relaxation, adventure, or cultural immersion, this destination offers something
                for every type of traveler. From world-class cuisine to breathtaking landscapes, prepare to create
                memories that will last a lifetime.
              </p>

              <h3 className="text-xl font-bold mb-4">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {[
                  "Round-trip flights",
                  "Luxury accommodation",
                  "Daily breakfast",
                  "Airport transfers",
                  "Guided tours",
                  "Travel insurance",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">Starting from</span>
                  <p className="text-4xl font-bold text-primary">${destination.price.toLocaleString()}</p>
                  <span className="text-sm text-muted-foreground">per person</span>
                </div>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{destination.duration}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      {destination.rating}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium capitalize">{destination.category}</span>
                  </div>
                </div>
                <Button className="w-full mb-3" size="lg" asChild>
                  <Link href="/contact">Book Now</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg" asChild>
                  <Link href="/contact">Ask a Question</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  )
}
