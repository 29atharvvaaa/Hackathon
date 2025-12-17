import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, Star, Check, ArrowLeft, Calendar, Users, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { packages } from "@/lib/data"

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const pkg = packages.find((p) => p.id === Number.parseInt(id))

  if (!pkg) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] pt-20">
        <Image src={pkg.image || "/placeholder.svg"} alt={pkg.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto px-4 lg:px-8">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Packages
            </Link>
            {pkg.featured && <Badge className="mb-3 bg-accent text-accent-foreground">Featured</Badge>}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{pkg.name}</h1>
            <div className="flex items-center gap-4 text-white/90">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {pkg.duration}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {pkg.rating}
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
              <h2 className="text-2xl font-bold mb-4">Package Overview</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {pkg.description}. This carefully curated package combines the best experiences, accommodations, and
                local insights to create an unforgettable journey. Every detail has been thoughtfully planned to ensure
                you can focus on making memories.
              </p>

              <h3 className="text-xl font-bold mb-4">Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {pkg.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-4">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Plane className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Flights</h4>
                    <p className="text-sm text-muted-foreground">Round-trip economy class flights</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Accommodation</h4>
                    <p className="text-sm text-muted-foreground">4-5 star hotels throughout</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Guided Tours</h4>
                    <p className="text-sm text-muted-foreground">Expert local guides included</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Meals</h4>
                    <p className="text-sm text-muted-foreground">Daily breakfast & select dinners</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">Starting from</span>
                  <p className="text-4xl font-bold text-primary">${pkg.price.toLocaleString()}</p>
                  <span className="text-sm text-muted-foreground">per person</span>
                </div>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{pkg.duration}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      {pkg.rating}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Group Size</span>
                    <span className="font-medium">2-12 travelers</span>
                  </div>
                </div>
                <Button className="w-full mb-3" size="lg" asChild>
                  <Link href="/contact">Book This Package</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg" asChild>
                  <Link href="/contact">Customize Trip</Link>
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
